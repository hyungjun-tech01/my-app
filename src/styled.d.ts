// import original module declarations
import 'styled-components';

// and extend them!
// interface 정의
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor : string;
    bgColor : string;
    accentColor : string;
  }
}