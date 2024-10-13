// import { Playground } from "./_components/Playgroundv0";

// export default function IAPage() {
//   return (
//       <Playground />
//   )
// }

import { InterfazChat } from './_components/InterfazChat';

export default function PaginaIA() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 font-flow">Chatea con Sofia, La IA de la Veterinaria Gamaliel</h1>
      <InterfazChat />
    </div>
  );
}
