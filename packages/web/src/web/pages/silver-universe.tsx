import { SilverCardBackground } from "../components/silver-card-background";

export default function SilverUniverse() {
  return (
    <main className="silver-card-area" aria-label="Prévia do fundo da área dos cards, em branco e prata">
      <p className="sr-only">Fundo branco com grade prateada e rastros animados, reaproveitado da área dos cards. Role para explorar sua extensão.</p>
      <SilverCardBackground />
    </main>
  );
}