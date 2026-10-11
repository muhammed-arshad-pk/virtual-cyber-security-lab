import CyberstalkingLab from './CyberstalkingLab';
import BotnetLab from './BotnetLab';
import PasswordLab from './PasswordLab';
import KeyloggerLab from './KeyloggerLab';
import DdosLab from './DdosLab';
import TrojanLab from './TrojanLab';
import SurfaceLab from './unit3/SurfaceLab';
import TrendsLab from './unit3/TrendsLab';
import HardenLab from './unit3/HardenLab';
import AuthLab from './unit3/AuthLab';
import MobileAttackLab from './unit3/MobileAttackLab';
import CardFraudLab from './unit3/CardFraudLab';
import MdmLab from './unit3/MdmLab';
import PiiLab from './unit4/PiiLab';
import IdTheftLab from './unit4/IdTheftLab';
import BufferLab from './unit4/BufferLab';
import MethodsLab from './unit4/MethodsLab';
import ItActLab from './unit5/ItActLab';
import TrailLab from './unit5/TrailLab';
import SignatureLab from './unit5/SignatureLab';
import AmendLab from './unit5/AmendLab';
import PunishLab from './unit5/PunishLab';
import EvidenceLab from './unit5/EvidenceLab';
import ComplianceLab from './unit5/ComplianceLab';

// Maps a topic's `lab.key` to its interactive component.
export const labRegistry = {
  cyberstalking: CyberstalkingLab,
  botnets: BotnetLab,
  password: PasswordLab,
  keylogger: KeyloggerLab,
  ddos: DdosLab,
  trojan: TrojanLab,
  'u3-surface': SurfaceLab,
  'u3-trends': TrendsLab,
  'u3-harden': HardenLab,
  'u3-auth': AuthLab,
  'u3-attacks': MobileAttackLab,
  'u3-card': CardFraudLab,
  'u3-mdm': MdmLab,
  'u4-pii': PiiLab,
  'u4-idtheft': IdTheftLab,
  'u4-buffer': BufferLab,
  'u4-methods': MethodsLab,
  'u5-itact': ItActLab,
  'u5-challenges': TrailLab,
  'u5-dsig': SignatureLab,
  'u5-amend': AmendLab,
  'u5-punish': PunishLab,
  'u5-evidence': EvidenceLab,
  'u5-comply': ComplianceLab,
};
