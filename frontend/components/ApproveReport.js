import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

const APPROVE_REPORT_MUTATION = gql`
  mutation APPROVE_REPORT_MUTATION($id: ID!) {
    updateReport(id: $id, data: { approved: true }) {
      id
    }
  }
`;

function update(cache, payload) {
  console.log(payload);
  console.log("Running the update function after delete.");
  cache.evict(cache.identify(payload.data.updateReport));
}

export default function ApproveReport({ id }) {
  const [approveReport, { loading, error }] = useMutation(
    APPROVE_REPORT_MUTATION,
    {
      variables: { id },
      update,
    }
  );

  return (
    <button
      className="approveButton"
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm("Are you sure you want to approve this item?")) {
          approveReport().catch((err) => alert(err.message));
        }
      }}
    >
      Approve
    </button>
  );
}
