export type ShareALinkInput = {
  recipients: {
    assignTo: string;
    email: string;
    message: string;
  }[];
  url: string;
};
