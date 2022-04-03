import { Rect, Stage, Layer } from "react-konva";

/** Bileşenimizin aldığı parametreleri
 * (props) belirten arayüz.
 */
export interface IHelloLibraryProps {
  text: string;
  rectWidth: number /* Dikdörtgen için genişlik */;
  rectHeight: number /* Dikdörtgen için yükseklik */;
  rectColor: string /* Dikdörtgen için renk tanımlaması */;
}

export default function HelloLibrary(props: IHelloLibraryProps) {
  return (
    <>
      <h1>React Typescript Library: {props.text}</h1>
      <Stage width={300} height={300}>
        <Layer>
          <Rect
            x={0}
            y={0}
            stroke="black"
            fill={props.rectColor || "green"}
            strokeWidth={2}
            width={props.rectWidth || 50}
            height={props.rectHeight || 50}
          />
        </Layer>
      </Stage>
    </>
  );
}
