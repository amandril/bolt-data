import React from "react";
import { useLazyQuery } from "@apollo/client";
import { resetIdCounter, useCombobox } from "downshift";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import { useRouter } from "next/dist/client/router";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown.js";

const SEARCH_ROUTES_QUERY = gql`
  query SEARCH_ROUTES_QUERY($searchTerm: String!) {
    searchTerms: allRoutes(
      where: { route_name_contains_i: $searchTerm }
      first: 4
    ) {
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
  const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_ROUTES_QUERY,
    {
      fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: true,
    }
  );
  console.log(loading, data, error);
  const items = data?.searchTerms || [];
  // let findItemsButChill = debounce(findItems, 350);
  const findItemsButChill = React.useCallback(debounce(findItems, 350), [
    findItems,
  ]);
  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      console.log(selectedItem);
      router.push({
        pathname: `/route/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.route_name || "",
  });
  return (
    <div>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search for an Item",
            id: "search",
            className: loading ? "loading" : null,
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen && (
          <div>
            {items.map((item, index) => (
              <DropDownItem
                {...getItemProps({ item, index })}
                key={item.id}
                highlighted={index === highlightedIndex}
              >
                {item.route_name}
              </DropDownItem>
            ))}
            {console.log(items.length)}
            {items.length >= 4 && <DropDownItem>More routes ➡️</DropDownItem>}
          </div>
        )}
        {isOpen && !items.length && loading && (
          <DropDownItem>Loading...</DropDownItem>
        )}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </div>
  );
}
