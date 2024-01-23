import { useQuery } from "@apollo/client";
import { gql } from "../__generated__/";
import { Layout, QueryResult } from "../components";
import TrackCard from '../containers/track-card';

const TRACKS = gql(`
query GetTracks {
  tracksForHome {
    id
    title
    thumbnail
    length
    modulesCount
    author {
      id
      name
      photo
    }
  }
}
`);

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  const { loading, error, data } = useQuery(TRACKS);

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  return (
  <Layout grid>
    <QueryResult error={error} loading={loading} data={data}>
    {data?.tracksForHome?.map((track, i) => (
      <TrackCard key={`track_${track.id}_${i}`} track={track} />
    ))}
    </QueryResult>
</Layout>
);
};

export default Tracks;
