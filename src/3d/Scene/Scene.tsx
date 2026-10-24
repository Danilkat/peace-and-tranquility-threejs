import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useResizeObserver } from "../../utils/useResize";
import { Renderer } from "../Renderer/Renderer";
import "./style.sass";

const Scene = () => {
  const rendererRef = useRef<Renderer>(null);
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const { width, height } = useResizeObserver(element);

  useEffect(() => {
    if (!rendererRef.current) {
      rendererRef.current = new Renderer();
    }
    if (element) {
      rendererRef.current.setDomElement(element);
    } else {
      rendererRef.current.clearDomElement();
    }
  }, [element]);

  useLayoutEffect(() => {
    rendererRef.current?.setSize(width, height);
  }, [width, height]);

  return <div ref={setElement} className="Scene"></div>;
};

export { Scene };
