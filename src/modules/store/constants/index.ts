import { IAllTechnologies } from "../types";
import { ANALYTICS } from "./technologies/analitycs";
import { ANIMATIONS_LIBRARIES } from "./technologies/animation-libraries";
import { AUTHORIZATION_TOOLS } from "./technologies/authorization-tools";
import { BACKEND_allTechnologies } from "./technologies/backend-technologies";
import { CI_CD } from "./technologies/ci-cd";
import { CLOUD } from "./technologies/cloud";
import { CMS } from "./technologies/cms";
import { CONTAINERIZATION } from "./technologies/containerization";
import { DATA_VISUALIZATION } from "./technologies/data-visualization";
import { DATABASES } from "./technologies/databases";
import { FETCHING_LIBRARIES } from "./technologies/fetching-libraries";
import { FORM_LIBRARIES } from "./technologies/form-libraries";
import { INTERNATIONALIZATION } from "./technologies/internationalization";
import { JAVASCRIPT_LIBRARIES } from "./technologies/javascript-libraries";
import { MAPS } from "./technologies/maps";
import { MARKDOWN_LANGUAGES } from "./technologies/markdown-languages";
import { MOBILE_FRAMEWORKS } from "./technologies/mobile-frameworks";
import { MODULE_BUMDLERS } from "./technologies/module-bundlers";
import { PAYMENT_TOOLS } from "./technologies/payment-tools";
import { PHP_FRAMEWORKS } from "./technologies/php-frameworks";
import { PROGRAMMING_LANGUAGES } from "./technologies/programming-languages";
import { REACT_NATIVE_LIBRARIES } from "./technologies/react-native-technologies";
import { SECURITY } from "./technologies/security";
import { STATE_MANAGEMENT_LIBRARIES } from "./technologies/state-management-libraries";
import { TESTING_FRAMEWORKS_AND_TOOLS } from "./technologies/testing-libraries";
import { UI_LIBRARIES } from "./technologies/ui-libraries";
import { WEB_SERVICES } from "./technologies/web-services";
import { SPEECH_RECOGNITION } from "./technologies/speech-recognition";
import { DOCUMENTATION } from "./technologies/documentation";
import { WEB_3 } from "./technologies/web3";
import { GRAPHIC_EDITORS } from "./technologies/graphic-editors";
import { VIRTUALIZATION } from "./technologies/virtualization";
import { PERFORMANCE_MONITORING_TOOLS } from "./technologies/monitoring-performance-tools";
import { LOGGING_TOOLS } from "./technologies/logging-tools";

export const allTechnologies: IAllTechnologies = {
  MARKDOWN_LANGUAGES,
  PROGRAMMING_LANGUAGES,
  JAVASCRIPT_LIBRARIES,
  MOBILE_FRAMEWORKS,
  PHP_FRAMEWORKS,
  REACT_NATIVE_LIBRARIES,
  FORM_LIBRARIES,
  STATE_MANAGEMENT_LIBRARIES,
  FETCHING_LIBRARIES,
  UI_LIBRARIES,
  DATA_VISUALIZATION,
  ANIMATIONS_LIBRARIES,
  TESTING_FRAMEWORKS_AND_TOOLS,
  INTERNATIONALIZATION,
  MAPS,
  BACKEND_allTechnologies,
  CLOUD,
  DATABASES,
  CMS,
  PAYMENT_TOOLS,
  WEB_SERVICES,
  AUTHORIZATION_TOOLS,
  CONTAINERIZATION,
  WEB_3,
  ANALYTICS,
  SECURITY,
  CI_CD,
  SPEECH_RECOGNITION,
  VIRTUALIZATION,
  DOCUMENTATION,
  LOGGING_TOOLS,
  PERFORMANCE_MONITORING_TOOLS,
  MODULE_BUMDLERS,
  GRAPHIC_EDITORS,
  NOT_FOUND: [],
};
