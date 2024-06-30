import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({
  onInputChange,
  onButtonSubmit,
  onHelpClicked,
  setInput,
}) => {
  const links = [
    {
      href: "https://i2-prod.mirror.co.uk/incoming/article14334083.ece/ALTERNATES/s615/3_Beautiful-girl-with-a-gentle-smile.jpg",
      text: "One Face Girl",
    },
    {
      href: "https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/family-of-four-7101-90ebbf35ea8e9b9d264dbb2ab724bc4e@1x.jpg",
      text: "Multiple Faces",
    },
  ];
  const handleExampleClick = (url) => {
    document.getElementById("inputUrl").value = url;
    setInput(url);
  };

  const onHideHelpClicked = () => {
    document.getElementById("help").style.display = "none";
    document.getElementById("showHelp").style.display = "block";
  };

  return (
    <div>
      <p className="f3">
        {
          "Este cerebro magico detectara los rostros de las personas en cualquier fotografia."
        }
      </p>
      <div className="center form pa4 br3 shadow-5 ">
        <div className="center w-100">
          <input
            id="inputUrl"
            type="text"
            className="f4 pa2 w-70 center"
            onChange={onInputChange}
          ></input>
          <button
            onClick={onButtonSubmit}
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-blue center"
          >
            Detect
          </button>
        </div>
      </div>
      <div className="">
        <button
          id="showHelp"
          onClick={onHelpClicked}
          className="f5 center"
          style={{ marginTop: "2px" }}
        >
          Help
        </button>
        <br />
        <div
          id="help"
          className="center"
          style={{
            border: "1px solid black",
            width: "235px",
            textAlign: "center",
          }}
        >
          <h5>Click on these examples to paste the URL:</h5>
          <ul style={{ listStyleType: "none" }}>
            {links.map((link, index) => (
              <li
                key={index}
                onClick={() => handleExampleClick(link.href)}
                className="li-link"
              >
                {link.text}
              </li>
            ))}
          </ul>
          <button
            id="showHelp"
            className="f5 center"
            onClick={onHideHelpClicked}
            style={{ marginBottom: "2px" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
