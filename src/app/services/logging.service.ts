/**
 * Created by orifjon9 on 5/21/2017.
 */
export class LoggingService {
  private logId: number = 0;

  logStatusChanged(status: any){
    console.log("Logging services was worked: " + status+ ", ID:" + (++this.logId));
  }
}
