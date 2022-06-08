import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DELETE_REPORT_MUTATION = gql`
  mutation DELETE_REPORT_MUTATION($id: ID!) {
    deleteReport(id: $id) {
      id
    }
  }
`;

// This function will get rid of the item from our Apollo cache

function update(cache, payload) {
  console.log(payload);
  console.log("Running the update function after delete.");
  cache.evict(cache.identify(payload.data.deleteReport));
}

export default function DeleteReport({ id }) {
  const [deleteReport, { loading, error }] = useMutation(
    DELETE_REPORT_MUTATION,
    {
      variables: { id },
      update,
    }
  );

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm("Are you sure you want to delete this report?")) {
          // go ahead and delete it
          deleteReport().catch((err) => alert(err.message));
        }
      }}
    >
      Delete
    </button>
  );
}
