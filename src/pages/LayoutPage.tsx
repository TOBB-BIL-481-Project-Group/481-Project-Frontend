import { useEffect } from "react";

type LayoutPageProps = {
  children: any;
};
export function LayoutPage({ children }: LayoutPageProps) {
  useEffect(() => {
    const script = document.createElement("script");
    const div = document.getElementById("supportByBMC");
    const div2 = document.getElementById("bmc-wbtn");
    if (div2 !== null && div2 !== undefined) return;
    script.setAttribute(
      "src",
      "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
    );
    script.setAttribute("data-name", "BMC-Widget");
    script.setAttribute("data-cfasync", "false");
    script.setAttribute("data-id", "farukavci");
    script.setAttribute("data-description", "Support me on Buy me a coffee!");
    script.setAttribute("data-message", "Want to buy me a coffee?");
    script.setAttribute("data-color", "#FF813F");
    script.setAttribute("data-position", "Right");
    script.setAttribute("data-x_margin", "18");
    script.setAttribute("data-y_margin", "18");

    script.onload = function () {
      var evt = document.createEvent("Event");
      evt.initEvent("DOMContentLoaded", false, false);
      window.dispatchEvent(evt);
    };

    div?.appendChild(script);
  }, []);

  return (
    <div>
      <div id="supportByBMC"></div>
      {children}
    </div>
  );
}
