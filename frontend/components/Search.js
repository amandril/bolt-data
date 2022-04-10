import { useLazyQuery } from "@apollo/client";
import { resetIdCounter, useCombobox } from "downshift";
import gql from "graphql-tag";
import debounce from "lodash.debounce";

const SEARCH_ROUTES_QUERY = gql`
  query SEARCH_ROUTES_QUERY($searchTerm: String!) {
    allRoutes(where: { route_name_contains_i: $searchTerm }) {
      id
      route_name
      lnglat
      bolts {
        id
        position
        condition
      }
    }
  }
`;

export default function Search() {
  const [findRoutes, { loading, data, error }] = useLazyQuery(
    SEARCH_ROUTES_QUERY,
    {
      fetchPolicy: "no-cache",
    }
  );

  const findRoutesButChill = debounce(findRoutes, 350);
  resetIdCounter();
  const { inputValue, getMenuProps, getInputProps, getComboboxProps } =
    useCombobox({
      items: [],
      onInputValueChange() {
        console.log("Input changed");
        findRoutesButChill({
          variables: {
            searchTerm: inputValue,
          },
        });
      },
      onSelectedItemChange() {
        console.log("Selected Item Change");
      },
    });

  return (
    <div>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search for a route",
            id: "search",
            className: "loading",
          })}
        />
      </div>
      <div {...getMenuProps()}>
        <div>Hey</div>
        <div>Hey</div>
        <div>Hey</div>
        <div>Hey</div>
      </div>
    </div>
  );
}
