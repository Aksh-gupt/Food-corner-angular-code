import { OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

export class AnalyseService implements OnInit{
    array:Number[];
    constructor(private userService: UserService){ }
    ngOnInit(){ 
        this.userService.readRecord().subscribe(
            (response) => {
                this.array = response.json();
            },(error) => {
                console.log(error);
            }
        );
    }
    getArray(){
        return this.array;
    }
}