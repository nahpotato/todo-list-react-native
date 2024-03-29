{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";

    corepack = {
      url = "github:SnO2WMaN/corepack-flake";

      inputs = {
        nixpkgs.follows = "nixpkgs";
        flake-utils.follows = "flake-utils";
      };
    };
  };

  outputs = { flake-utils, nixpkgs, corepack, ... }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;

          config = {
            android_sdk.accept_license = true;
            allowUnfree = true;
          };

          overlays = [ corepack.overlays.default ];
        };

        androidComposition = pkgs.androidenv.composeAndroidPackages {
          buildToolsVersions = [ "34.0.0" "33.0.1" ];
          cmakeVersions = [ "3.22.1" ];
          includeNDK = true;
          ndkVersion = "25.1.8937393";
          platformVersions = [ "34" ];
          abiVersions = [ "arm64-v8a" "x86_64" ];
        };

        androidSdk = androidComposition.androidsdk;
      in
      {
        devShell = pkgs.mkShell {
          ANDROID_HOME = "${androidSdk}/libexec/android-sdk";
          packages = with pkgs; [
            androidSdk
            jdk17
            nodejs_20
            (mkCorepack { nodejs = nodejs_20; pm = "yarn"; })
          ];
        };
      }
    );
}
