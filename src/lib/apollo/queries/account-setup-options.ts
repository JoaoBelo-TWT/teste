import { gql } from '@/__generated__';

export const getAccountSetupOptionsQuery = gql(`
query GetAccountOptions {
  companyRoles (
    first: 100
    sorting: {
      order: asc
      field: "name"
  }
  ) {
    edges {
      node {
        id
         name
       	 createdAt
      }
    }
  },
  companyIndustries (    
    first: 100
    sorting: {
      order: asc
      field: "name"
  }) {
    edges {
      node {
        id
         name
       	 createdAt
      }
    }
  },
 companySizes (    
  first:100
  ) {
    edges {
      node {
        id
         name
       	 createdAt
      }
    }
  }
}
`);
