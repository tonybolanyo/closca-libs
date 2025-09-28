# Angular Version Compatibility Guide

This document provides comprehensive information about the Angular Foundation Library's compatibility with different Angular versions and precise installation instructions.

## 📋 Compatibility Matrix

### Full Compatibility Table

| Angular Version | Library Version | TypeScript | RxJS | Node.js | Build Target | Status |
|----------------|-----------------|------------|------|---------|--------------|---------|
| **9.0.x - 9.1.x** | 1.0.0+ | 3.8.x - 3.9.x | 6.5.x - 6.6.x | 12.x - 14.x | ES2015 | ✅ Fully Supported |
| **10.0.x - 10.2.x** | 1.0.0+ | 3.9.x - 4.0.x | 6.5.x - 6.6.x | 12.x - 14.x | ES2015 | ✅ Fully Supported |
| **11.0.x - 11.2.x** | 1.0.0+ | 4.0.x - 4.1.x | 6.6.x | 12.x - 14.x | ES2015 | ✅ Fully Supported |
| **12.0.x - 12.2.x** | 1.0.0+ | 4.2.x - 4.3.x | 6.6.x | 12.x - 16.x | ES2015 | ✅ Fully Supported |
| **13.0.x - 13.3.x** | 1.0.0+ | 4.4.x - 4.5.x | 7.4.x | 14.x - 16.x | ES2015 | ✅ Fully Supported |
| **14.0.x - 14.3.x** | 1.0.0+ | 4.7.x - 4.8.x | 7.5.x | 14.x - 16.x | ES2015 | ✅ Fully Supported |
| **15.0.x - 15.2.x** | 1.0.0+ | 4.8.x - 4.9.x | 7.5.x | 16.x - 18.x | ES2015 | ✅ Fully Supported |
| **16.0.x - 16.2.x** | 1.0.0+ | 4.9.x - 5.0.x | 7.5.x | 16.x - 18.x | ES2015 | ✅ Fully Supported |
| **17.0.x - 17.3.x** | 1.0.0+ | 5.0.x - 5.2.x | 7.5.x | 18.x | ES2015 | ✅ Fully Supported |
| **18.0.x - 18.2.x** | 1.0.0+ | 5.0.x - 5.4.x | 7.5.x | 18.x | ES2015 | ✅ Fully Supported |
| **19.0.x - 19.2.x** | 1.0.0+ | 5.4.x - 5.6.x | 7.8.x | 18.x | ES2015 | ✅ Fully Supported |
| **20.0.x - 20.3.x** | 1.0.0+ | 5.6.x - 5.9.x | 7.8.x | 18.x | ES2015 | ✅ Fully Supported |

## 🚀 Installation Instructions by Version Group

### Angular 9 - 12 (Traditional Module Pattern)

#### Prerequisites
```bash
# Check your Angular version
ng version

# Ensure you have the correct Node.js version (12.x - 16.x)
node --version
```

#### Installation
```bash
# Install the library
npm install @tyris/angular-foundation

# Install peer dependencies if not already present
npm install @angular/core@">=9.0.0" @angular/common@">=9.0.0" rxjs@">=6.5.0"
```

#### Module Setup
```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFoundationModule } from '@tyris/angular-foundation';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule, // Required for HTTP functionality
    AngularFoundationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### Build Commands
```bash
# Build for Angular 9-12
npm run build:angular9-12

# Package for distribution
npm run pack:angular9-12
```

### Angular 13 - 15 (Ivy + Standalone Support)

#### Prerequisites
```bash
# Check Angular version
ng version

# Ensure you have Node.js 14.x - 16.x
node --version
```

#### Installation
```bash
# Install the library
npm install @tyris/angular-foundation

# Verify peer dependencies
npm install @angular/core@">=13.0.0" @angular/common@">=13.0.0" rxjs@">=7.4.0"
```

#### Traditional Module Setup
```typescript
// app.module.ts (same as Angular 9-12)
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFoundationModule } from '@tyris/angular-foundation';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFoundationModule.forRoot()
  ],
  // ...
})
export class AppModule { }
```

#### Standalone Components Setup (Angular 14+)
```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFoundationModule } from '@tyris/angular-foundation';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      AngularFoundationModule.forRoot()
    )
  ]
});
```

#### Build Commands
```bash
# Build for Angular 13-15
npm run build:angular13-15

# Package for distribution
npm run pack:angular13-15
```

### Angular 16 - 18 (Modern Providers)

#### Prerequisites
```bash
# Check Angular version  
ng version

# Ensure you have Node.js 16.x - 18.x
node --version
```

#### Installation
```bash
# Install the library
npm install @tyris/angular-foundation

# Verify peer dependencies
npm install @angular/core@">=16.0.0" @angular/common@">=16.0.0" rxjs@">=7.5.0"
```

#### Modern Standalone Setup (Recommended)
```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AngularFoundationModule } from '@tyris/angular-foundation';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    // Spread the library providers
    ...AngularFoundationModule.forRoot().providers
  ]
});
```

#### Traditional Module Setup (Still Supported)
```typescript
// app.module.ts (same as previous versions)
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFoundationModule } from '@tyris/angular-foundation';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFoundationModule.forRoot()
  ],
  // ...
})
export class AppModule { }
```

#### Build Commands
```bash
# Build for Angular 16-18
npm run build:angular16-18

# Package for distribution
npm run pack:angular16-18
```

### Angular 19 - 20 (Latest)

#### Prerequisites
```bash
# Check Angular version
ng version

# Ensure you have Node.js 18.x+
node --version
```

#### Installation
```bash
# Install the library
npm install @tyris/angular-foundation

# Verify peer dependencies
npm install @angular/core@">=19.0.0" @angular/common@">=19.0.0" rxjs@">=7.8.0"
```

#### Modern Setup (Recommended)
```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AngularFoundationModule } from '@tyris/angular-foundation';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    ...AngularFoundationModule.forRoot().providers
  ]
});
```

#### Build Commands
```bash
# Build for Angular 19-20
npm run build:angular19-20

# Package for distribution  
npm run pack:angular19-20
```

## 🔧 Version-Specific Features

### Angular 9-12 Features
- ✅ Traditional NgModule pattern
- ✅ HttpClientModule required
- ✅ Ivy renderer support
- ✅ Tree-shaking optimization

### Angular 13-15 Features  
- ✅ Everything from 9-12
- ✅ Standalone components support
- ✅ importProvidersFrom() pattern
- ✅ Enhanced build optimizations

### Angular 16-18 Features
- ✅ Everything from 13-15
- ✅ provideHttpClient() function
- ✅ Direct provider spreading
- ✅ Improved bundle sizes

### Angular 19-20 Features
- ✅ Everything from 16-18  
- ✅ Latest Angular features
- ✅ Enhanced type checking
- ✅ Performance optimizations

## ⚠️ Migration Notes

### From Angular 8 to 9+
- Update to Angular 9+ first using `ng update`
- Install the library after Angular upgrade
- Switch to Ivy renderer (usually automatic)

### Between Angular Versions
- The library maintains API compatibility across all supported versions
- No code changes required for library usage
- Follow Angular's official migration guides for framework updates

## 🛠️ Build Scripts Reference

The library provides version-specific build scripts:

```bash
# Individual version builds
npm run build:angular9      # Angular 9 specific
npm run build:angular9-12   # Angular 9-12 group
npm run build:angular13-15  # Angular 13-15 group  
npm run build:angular16-18  # Angular 16-18 group
npm run build:angular19-20  # Angular 19-20 group

# Package builds
npm run pack:angular9       # Package for Angular 9
npm run pack:angular9-12    # Package for Angular 9-12
npm run pack:angular13-15   # Package for Angular 13-15
npm run pack:angular16-18   # Package for Angular 16-18
npm run pack:angular19-20   # Package for Angular 19-20
```

## 📞 Support

If you encounter issues with specific Angular versions:

1. Check the compatibility matrix above
2. Verify your peer dependencies match the requirements
3. Review version-specific setup instructions
4. Check [GitHub Issues](https://github.com/tonybolanyo/closca-libs/issues) for known issues
5. Open a new issue with your Angular version and error details

---

**Note**: This library is tested and verified to work with all listed Angular versions. The build targets ES2015 for maximum compatibility while maintaining modern features.