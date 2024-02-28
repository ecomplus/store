{pkgs}: {
  channel = "stable-23.05"; # "stable-23.05" or "unstable"
  packages = [
    pkgs.nodejs_18
    pkgs.nodePackages.firebase-tools
  ];
  idx.extensions = [
    "vue.volar"
    "astro-build.astro-vscode"
    "bradlc.vscode-tailwindcss"
  ];
  idx.workspace.onCreate = {
    npm-install = "npm install && npm install --prefix functions/ssr";
  };
  idx.previews = {
    enable = true;
    previews = [
      {
        command = ["npm" "run" "dev" "--" "--port" "$PORT" "--host"];
        manager = "web";
        id = "web";
      }
    ];
  };
}
