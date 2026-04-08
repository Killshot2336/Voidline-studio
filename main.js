(function () {
  const hour = new Date().getHours();
  let phase = "night";
  if (hour >= 5 && hour < 12) phase = "morning";
  else if (hour >= 12 && hour < 18) phase = "afternoon";
  document.documentElement.setAttribute("data-phase", phase);
})();
