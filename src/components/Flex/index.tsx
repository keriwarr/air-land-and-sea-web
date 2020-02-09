import styled from "styled-components";

export const GrowingSpacer = styled.div`
  flex-grow: 1;
`;

export const FixedSizeSpacer = styled.div<{flexBasis: number}>`
  flex-basis: ${props => props.flexBasis}px;
`;
