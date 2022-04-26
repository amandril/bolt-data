export default function aboutPage() {
  return (
    <section className="main">
      <div className="about">
        <h1 className="pageHeader">Keeping Track</h1>

        <p>
          This project started with a question - how do we keep track of all
          this stuff?
        </p>
        {/* <p>
        Rebolting is the process of sustainably replacing fixed hardware for
        recreational users in the vertical world. It's more important than ever
        now that climbing is a mainstream sport. Every day aging fixed anchors
        get closer to catastrophic failure for the person tied into the rope.
      </p>
      <p>
        DataBolt is one solution, by enabling publicly contributed reports, and
        keeping track of our replacement progress. Local orgs around the world
        can help keep recreational users safe by triaging, training, and knowing
        how to budget.
      </p> */}

        {/* <p>
        In July of 2015, a scare on the cliff and no way to relay led to the
        desire for a better way.
      </p> */}
        <p>
          DataBolt is a fixed hardware database for the climbing community.
          Preloaded using OpenBeta's open source climbing data and interfaced so
          it's always up to date, DataBolt makes it easy for stewards to focus
          on the important stuff – keeping people safe.
        </p>
        <p>
          DataBolt is built on React, GraphQL, CSS Grid, and made with love in
          Boulder, CO.
        </p>
        <p>
          This project's future is open source – 
          <a href="https://github.com/amandril/data-bolt" target="_blank">
            GitHub
          </a>
        </p>
      </div>
    </section>
  );
}
