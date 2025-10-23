import { useState, useEffect } from "react";

export default function useTypingEffect(
  lines,
  typingSpeed = 100,
  deletingSpeed = 50,
  pause = 1200
) {
  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentLine = lines[lineIndex % lines.length];

    if (!isDeleting && text.length < currentLine.length) {
      // typing
      const timeout = setTimeout(() => {
        setText(currentLine.slice(0, text.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text.length > 0) {
      // deleting
      const timeout = setTimeout(() => {
        setText(currentLine.slice(0, text.length - 1));
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && text.length === currentLine.length) {
      // pause before deleting
      const timeout = setTimeout(() => setIsDeleting(true), pause);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text.length === 0) {
      // move to next line
      setIsDeleting(false);
      setLineIndex((prev) => prev + 1);
    }
  }, [text, isDeleting, lineIndex, lines, typingSpeed, deletingSpeed, pause]);

  return text;
}
