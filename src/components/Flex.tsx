import styled from "styled-components";

export const GrowingSpacer = styled.div`
  flex-grow: 1;
`;

export const FixedSizeSpacer = styled.div<{ flexBasis: number }>`
  flex-basis: ${props => props.flexBasis}px;
  flex-shrink: 0;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CenteredRow = styled(Row)`
  justify-content: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CenteredColumn = styled(Column)`
  justify-content: center;
  text-align: center;
`;
