import { HeroSection } from '@/components/home/HeroSection';
import { EventOverview } from '@/components/home/EventOverview';
import { CareerJourney } from '@/components/home/CareerJourney';
import { MainFields } from '@/components/home/MainFields';
import { ActivitiesSection } from '@/components/home/ActivitiesSection';
import { SpeakersSection } from '@/components/home/SpeakersSection';
import { SponsorsSection } from '@/components/home/SponsorsSection';
import { OrganizerSection } from '@/components/home/OrganizerSection';
import { VenueSection } from '@/components/home/VenueSection';
import { FinalCTA } from '@/components/home/FinalCTA';
import { getServiceSupabase } from '@/lib/supabase/admin';
import { Speaker, Sponsor } from '@/types';

async function getPublishedData() {
  try {
    const supabase = getServiceSupabase();

    const [speakersRes, sponsorsRes] = await Promise.all([
      supabase.from('speakers').select('*').eq('is_published', true).order('display_order', { ascending: true }),
      supabase.from('sponsors').select('*').eq('is_published', true).order('display_order', { ascending: true }),
    ]);

    return {
      speakers: (speakersRes.data as Speaker[]) || [],
      sponsors: (sponsorsRes.data as Sponsor[]) || [],
    };
  } catch (err) {
    console.error('Error fetching home data from Supabase:', err);
    return { speakers: [], sponsors: [] };
  }
}

export default async function HomePage() {
  const { speakers, sponsors } = await getPublishedData();

  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <EventOverview />
      <CareerJourney />
      <MainFields />
      <ActivitiesSection />
      <SpeakersSection speakers={speakers} />
      <SponsorsSection sponsors={sponsors} />
      <OrganizerSection />
      <VenueSection />
      <FinalCTA />
    </div>
  );
}
