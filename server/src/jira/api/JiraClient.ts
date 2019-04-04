import * as request from 'request';
import { Validator } from '../../helpers/Validator';
import { Issue } from '../Issue';
import { Issue as AppIssue } from '../../entities/Issue';
import { validate } from 'node-typechecker';

interface JiraClientConfig {
  domain: string;
  defaultProjectKey: string;
  userName: string;
  password: string;
}

interface ClientResponse {
  statusCode: number;
  headers: {[key: string]: string | string[]};
  body: any
}

export class JiraClient {
  private readonly baseUrl: string;
  private readonly projectKey: string;
  private readonly userName: string;
  private readonly password: string;

  constructor(config: JiraClientConfig) {
    Validator.validate(config, Validator.isObject, 'JIRA client config must be a valid object');
    Validator.validate(config.domain, Validator.isNonEmptyString, 'JIRA config domain must be a non empty string');
    Validator.validate(config.defaultProjectKey, Validator.isNonEmptyString, 'JIRA config default project key must be a non empty string');
    Validator.validate(config.userName, Validator.isNonEmptyString, 'JIRA config user name must be a non empty string');
    Validator.validate(config.password, Validator.isNonEmptyString, 'JIRA config password must be a non empty string');

    this.baseUrl = `https://${config.domain.trim()}.atlassian.net/rest/api/3/`;
    this.projectKey = config.defaultProjectKey.trim();
    this.userName = config.userName.trim();
    this.password = config.password.trim();

    Object.freeze(this);
  }

  private sendRequest(url: string, method: string = 'GET'): Promise<ClientResponse> {
    const options: request.CoreOptions = {
      method,
      auth: {
        username: this.userName,
        password: this.password
      },
      json: true
    };

    return new Promise<any>((resolve, reject) => {
      request(`${this.baseUrl}/${url.replace(/^\/+/g, '')}`, options, (err, res, body) => {
        if (err) {
          return reject(err);
        }

        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body
        })
      });
    });
  }

  public async getProjectIssues(projectKey?: string): Promise<AppIssue[]> {
    const key = Validator.isNonEmptyString(projectKey) ? projectKey.trim() : this.projectKey;
    const result = await this.sendRequest(`search?jql=project=${key}&validateQuery=true&fields=priority,status,assignee,issuetype,summary,resolution&maxResults=100`)
    return validate(result.body.issues, Array, Issue).map(i => i.toEntity());
  }
}
