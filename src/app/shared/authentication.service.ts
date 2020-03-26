import { Subject } from 'rxjs/Subject';

export class AuthenticationService{
    
    loggingin = new Subject<Boolean>();
}