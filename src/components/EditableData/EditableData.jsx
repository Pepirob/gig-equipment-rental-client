import sanitizeHtml from "sanitize-html";
import ContentEditable from "react-contenteditable";
import Icon from "../Icon";
import { useEffect, useState, useCallback } from "react";
import "./EditableData.css";

const EditableData = ({ initData, tagName, setData, ...props }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(initData);
  }, []);

  const handleChange = useCallback((event) => {
    const sanitizeConfig = {
      allowedTags: [],
      allowedAttributes: [],
    };

    const sanitizedValue = sanitizeHtml(event.target.value);

    setContent(sanitizedValue);
    setData(sanitizedValue);
  });

  return (
    <>
      <ContentEditable
        tagName={tagName}
        html={content}
        onChange={handleChange}
        {...props}
        className="editable-data-text"
      />
      <Icon
        iconName="Pencil"
        color="green"
        size={16}
        title="Click for editing"
        className="editable-data-icon"
      />
    </>
  );
};

export default EditableData;
