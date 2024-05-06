import { GithubIssuePayload, GithubStarPayload } from "../../interfaces";

export class GithubService {
  static onStar(payload: GithubStarPayload): string {
    const { sender, repository, action } = payload;

    return `User ${sender.login} ${action} star on repository: { name: ${repository.name}, id: ${repository.id} }`;
  }

  static onIssue(payload: GithubIssuePayload): string {
    const { sender, repository, action, issue } = payload;

    return `User ${sender.login} ${action} the issue ${issue.title} - ${issue.id} on repository: { name: ${repository.name}, id: ${repository.id} } `;
  }
}
