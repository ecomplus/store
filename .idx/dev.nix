{pkgs}: {
  channel = "stable-23.05"; # "stable-23.05" or "unstable"
  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.firebase-tools
  ];
  idx.extensions = [
    "vue.volar"
    "astro-build.astro-vscode"
    "bradlc.vscode-tailwindcss"
    "dbaeumer.vscode-eslint"
  ];
  idx.workspace.onCreate = {
    npm-install = "npm install";
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
