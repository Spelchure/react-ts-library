/// <reference types="react" />
/** Bileşenimizin aldığı parametreleri
 * (props) belirten arayüz.
 */
export interface IHelloLibraryProps {
    text: string;
    rectWidth: number;
    rectHeight: number;
    rectColor: string;
}
export default function HelloLibrary(props: IHelloLibraryProps): JSX.Element;
