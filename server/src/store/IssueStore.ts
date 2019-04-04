import { MemoryStore } from './MemoryStore';
import { Issue } from '../entities/Issue';

export class IssueStore extends MemoryStore<Issue> {}
