"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function ExpandableContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      setClamped(el.scrollHeight > el.clientHeight);
    }
  }, [children]);

  return (
    <div>
      <div
        ref={contentRef}
        className={expanded ? className : `line-clamp-4 ${className ?? ""}`}
      >
        {children}
      </div>
      {clamped && (
        <Button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 bg-transparent px-0 text-sm text-blue-600 shadow-none hover:bg-transparent hover:underline"
        >
          {expanded ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  );
}
