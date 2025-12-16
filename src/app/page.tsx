import { SideNav } from '@/components/SideNav';
import { Design, IntroSection } from '@/components/Sections';

export default function Home() {
  return (
    <main className="relative bg-zinc-950 min-h-screen text-white">
      <SideNav />
      <div id="intro" className="min-h-screen flex items-center justify-center">
        <IntroSection />
      </div>

      <div id="ui-ux">
        <Design />
      </div>

      <section
        id="posters"
        className="min-h-screen flex items-center justify-center"
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
