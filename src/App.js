import React from "react";
import { useQuery } from "urql";
import "./App.css";

const FILMS_QUERY = `
  {
    launchesPast(limit: 100000) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        video_link
      }
      rocket {
        rocket_name
      }
    }
  }
`;

export default function App() {
  const [result] = useQuery({
    query: FILMS_QUERY,
  });

  const { data, fetching, error } = result;

  if (fetching) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <div className="App">
      <table>
        <tr>
          <th>ID</th>
          <th>Misson name</th>
          <th>Launch Date</th>
          <th>Launch Site</th>
          <th>Video Link</th>
          <th>Rocket</th>
        </tr>
        {data.launchesPast.map((launch) => {
          return (
            <tr key={launch.id}>
              <th>
                <h1>{launch.id}</h1>
              </th>
              <th>
                <h1>{launch.mission_name}</h1>
              </th>
              <th>
                <h1>{launch.launch_date_local}</h1>
              </th>
              <th>
                <h1>{launch.launch_site.site_name_long}</h1>
              </th>
              <th>
                <h1>{launch.links.video_link}</h1>
              </th>
              <th>
                <h1>{launch.rocket.rocket_name}</h1>
              </th>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
