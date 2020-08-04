const installButton = document.getElementById("install");
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (evt) => {
  console.log(evt);
  event.preventDefault();
  deferredPrompt = evt;
  installButton.style.display = "block";
});

installButton.addEventListener("click", async () => {
  await deferredPrompt.prompt();
  const choiseResult = await deferredPrompt.userChoise;
  console.log(choiseResult.outcome);
});
