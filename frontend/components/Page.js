import propTypes from 'prop-types';
import styled, {createGlobalStyle} from 'styled-components';



const InnerStyles = styled.div`
max-width: var(--maxWidth);
margin: 0 auto;
padding: 2rem;
`;

export default function Page({children}) {
    return <InnerStyles>{children}</InnerStyles>
}

Page.propTypes = {
    children: propTypes.any,
};