import React from 'react';
import dynamic from 'next/dynamic';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Download from "yet-another-react-lightbox/plugins/download";
import Share from "yet-another-react-lightbox/plugins/share";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

interface LightboxComponentProps {
  open: boolean;
  close: () => void;
  slides: Array<{
    src: string;
    title?: string;
    description?: string;
  }>;
  index: number;
}

export function LightboxComponent({ open, close, slides, index }: LightboxComponentProps) {
  return (
    <Lightbox
      open={open}
      close={close}
      styles={{
        container: {
          backgroundColor: "rgba(0, 0, 0, .7)"
        },
        toolbar: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
        }
      }}
      counter={{ container: { style: { top: 35 } } }}
      plugins={[Zoom, Fullscreen, Download, Share, Counter, Slideshow, Thumbnails, Captions]}
      slides={slides}
      index={index}
      controller={{ closeOnBackdropClick: true }}
      zoom={{
        maxZoomPixelRatio: 10,
        zoomInMultiplier: 5,
        doubleTapDelay: 1000,
        doubleClickDelay: 1000,
        doubleClickMaxStops: 5,
        keyboardMoveDistance: 200,
        wheelZoomDistanceFactor: 200,
        pinchZoomDistanceFactor: 200,
        scrollToZoom: true,
      }}
      captions={{
        showToggle: true,
        hidden: false,
        descriptionTextAlign: 'center',
        descriptionMaxLines: 5,
      }}
    />
  );
}