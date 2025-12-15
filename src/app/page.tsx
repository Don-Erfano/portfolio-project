import { SideNav } from '@/components/SideNav';
import { IntroSection } from '@/components/Sections';

export default function Home() {
  return (
    <main className="relative bg-zinc-950 min-h-screen text-white">
      <SideNav />
      <section
        id="intro"
        className="min-h-screen flex items-center justify-center border-b border-white/10"
      >
        <IntroSection />
      </section>

      <section
        id="ui-ux"
        className="min-h-screen flex items-center justify-center border-b border-white/10 bg-zinc-900"
      >
        <h1 className="text-4xl font-bold">UI/UX & LOGO DESIGNS</h1>
      </section>

      <section
        id="posters"
        className="min-h-screen flex items-center justify-center border-b border-white/10"
      >
        <h1 className="text-4xl font-bold">POSTERS</h1>
      </section>

      <section
        id="3d-arts"
        className="min-h-screen flex items-center justify-center bg-zinc-900"
      >
        <h1 className="text-4xl font-bold">3D ARTS & ANIMATIONS</h1>
      </section>
    </main>
  );
}
