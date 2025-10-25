import type { NativeModule } from 'craby-modules';
import { NativeModuleRegistry } from 'craby-modules';

interface Spec extends NativeModule {
  digest(data: string): string;
}

export default NativeModuleRegistry.getEnforcing<Spec>('CrabySha256');
