import type { DebugExercise } from './types';

// ---------------------------------------------------------------------------
// Music Streamer debug exercises (12 bugs)
// ---------------------------------------------------------------------------

export const musicStreamerExercises: DebugExercise[] = [
  // -----------------------------------------------------------------------
  // Bug 1: Constructor Calls Abstract Method Before Subclass Init
  // -----------------------------------------------------------------------
  {
    id: 'music-streamer-1',
    project: 'music-streamer',
    projectLabel: 'Music Streamer',
    bugNumber: 1,
    title: 'Constructor Calls Abstract Method Before Subclass Init',
    difficulty: 'medium',
    category: 'inheritance',
    language: 'typescript',
    symptom: `### Symptom

Genre codes display \`"UNDEFINED-POP"\` instead of \`"STARLIGHT-POP"\`. The \`genreCode\` field uses \`this.album\` before the Song subclass has initialized it.

### What you know

The **Track** base class computes a genre code during construction by calling an abstract method. The **Song** subclass implements this method using its own \`album\` field. But genre codes always start with \`"UNDEFINED-"\`.`,
    hints: [
      'The genre code is computed during object construction. Think about when fields are initialized in an inheritance chain.',
      'Look at the Track constructor and what methods it calls. Then look at when Song\'s fields get assigned.',
      'The base class constructor calls this.computeGenreCode() -- an abstract method. But Song.computeGenreCode() references this.album, which hasn\'t been assigned yet because Song\'s constructor hasn\'t run its own assignments.',
    ],
    files: [
      {
        filename: 'Song.ts',
        language: 'typescript',
        buggyCode: `// --- Inline Types ---
interface TrackData {
  id: string;
  title: string;
  genre: string;
  album?: string;
  trackNumber?: number;
  durationSeconds: number;
  playCount: number;
}

// --- Base class ---
abstract class Track {
  public readonly id: string;
  public readonly title: string;
  public readonly genre: string;
  public readonly durationSeconds: number;
  public readonly playCount: number;
  public readonly genreCode: string;

  constructor(data: TrackData) {
    this.id = data.id;
    this.title = data.title;
    this.genre = data.genre;
    this.durationSeconds = data.durationSeconds;
    this.playCount = data.playCount;
    // BUG: Calls abstract method before subclass fields are initialized
    this.genreCode = this.computeGenreCode();
  }

  protected abstract computeGenreCode(): string;
}

// --- Subclass ---
class Song extends Track {
  public album: string;
  public readonly trackNumber: number;

  constructor(data: TrackData) {
    super(data); // Track constructor runs computeGenreCode() here -- this.album is still undefined
    this.album = data.album ?? 'Unknown Album';
    this.trackNumber = data.trackNumber ?? 1;
  }

  protected computeGenreCode(): string {
    return \`\${this.album}-\${this.genre}\`.toUpperCase();
  }
}

export function createSong(data: TrackData): { genreCode: string; album: string } {
  const song = new Song(data);
  return { genreCode: song.genreCode, album: song.album };
}`,
        solutionCode: `// --- Inline Types ---
interface TrackData {
  id: string;
  title: string;
  genre: string;
  album?: string;
  trackNumber?: number;
  durationSeconds: number;
  playCount: number;
}

// --- Base class ---
abstract class Track {
  public readonly id: string;
  public readonly title: string;
  public readonly genre: string;
  public readonly durationSeconds: number;
  public readonly playCount: number;
  // FIX: Use lazy getter instead of eager computation in constructor
  private _genreCode?: string;

  constructor(data: TrackData) {
    this.id = data.id;
    this.title = data.title;
    this.genre = data.genre;
    this.durationSeconds = data.durationSeconds;
    this.playCount = data.playCount;
    // REMOVED: this.genreCode = this.computeGenreCode();
  }

  public get genreCode(): string {
    if (!this._genreCode) {
      this._genreCode = this.computeGenreCode();
    }
    return this._genreCode;
  }

  protected abstract computeGenreCode(): string;
}

// --- Subclass ---
class Song extends Track {
  public album: string;
  public readonly trackNumber: number;

  constructor(data: TrackData) {
    super(data);
    this.album = data.album ?? 'Unknown Album';
    this.trackNumber = data.trackNumber ?? 1;
  }

  protected computeGenreCode(): string {
    return \`\${this.album}-\${this.genre}\`.toUpperCase();
  }
}

export function createSong(data: TrackData): { genreCode: string; album: string } {
  const song = new Song(data);
  return { genreCode: song.genreCode, album: song.album };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'Song.test.ts',
        language: 'typescript',
        code: `import { createSong } from "./Song";

describe('Bug 1: Genre Code Construction', () => {
  const makeTrackData = () => ({
    id: 'TRK-001',
    title: 'Midnight Dreams',
    genre: 'Pop',
    album: 'Starlight',
    trackNumber: 3,
    durationSeconds: 234,
    playCount: 1500000,
  });

  it('should produce genre code containing the album name', () => {
    const result = createSong(makeTrackData());
    expect(result.genreCode).toContain('STARLIGHT');
  });

  it('should produce genre code in format ALBUM-GENRE', () => {
    const result = createSong(makeTrackData());
    expect(result.genreCode).toBe('STARLIGHT-POP');
  });

  it('should NOT contain "UNDEFINED" in the genre code', () => {
    const result = createSong(makeTrackData());
    expect(result.genreCode).not.toContain('UNDEFINED');
  });

  it('should handle different album and genre combinations', () => {
    const data = makeTrackData();
    data.album = 'Electric Avenue';
    data.genre = 'Rock';
    const result = createSong(data);
    expect(result.genreCode).toBe('ELECTRIC AVENUE-ROCK');
  });

  it('should use default album when none provided', () => {
    const data = makeTrackData();
    delete (data as any).album;
    const result = createSong(data);
    expect(result.genreCode).toBe('UNKNOWN ALBUM-POP');
  });
});`,
      },
    ],
    solutionExplanation: `The \`Track\` base class constructor calls the abstract method \`this.computeGenreCode()\`. When \`Song\` is constructed, JavaScript executes: \`Song constructor -> super(data) -> Track constructor -> this.computeGenreCode()\`. At this point, \`Song\`'s constructor body hasn't run yet, so \`this.album\` is \`undefined\`. The string interpolation produces \`"undefined-Pop"\`. The fix is to use lazy evaluation (a getter that caches the result) instead of eagerly computing in the constructor.`,
  },

  // -----------------------------------------------------------------------
  // Bug 2: Factory Registry Maps Podcast to MusicVideo
  // -----------------------------------------------------------------------
  {
    id: 'music-streamer-2',
    project: 'music-streamer',
    projectLabel: 'Music Streamer',
    bugNumber: 2,
    title: 'Factory Registry Maps Podcast to MusicVideo',
    difficulty: 'easy',
    category: 'factory-pattern',
    language: 'typescript',
    symptom: `### Symptom

Podcasts display with Music Video fields (Director, Regions) instead of Podcast fields (Show Name, Episode Number). The factory's registry maps \`'podcast'\` to the wrong constructor.

### What you know

The **TrackFactory** uses a static registry to map track types to their constructors. When a podcast is created, it shows music video details instead of podcast details.`,
    hints: [
      'The problem is in how tracks are constructed, not rendered. Check the factory that creates Track instances.',
      'Look at the registry mapping in TrackFactory. Check what class is mapped to \'podcast\'.',
      'The \'podcast\' type is mapped to MusicVideo instead of Podcast.',
    ],
    files: [
      {
        filename: 'TrackFactory.ts',
        language: 'typescript',
        buggyCode: `// --- Inline Types ---
type TrackType = 'song' | 'podcast' | 'music_video' | 'live_performance';

interface TrackData {
  id: string;
  title: string;
  type: TrackType;
  genre: string;
  showName?: string;
  episodeNumber?: number;
  director?: string;
  availableRegions?: string[];
}

interface DetailRow {
  label: string;
  value: string;
}

// --- Track classes ---
abstract class Track {
  public readonly id: string;
  public readonly title: string;
  public readonly genre: string;

  constructor(data: TrackData) {
    this.id = data.id;
    this.title = data.title;
    this.genre = data.genre;
  }

  abstract getType(): TrackType;
  abstract getDetailRows(): DetailRow[];
}

class Song extends Track {
  getType(): TrackType { return 'song'; }
  getDetailRows(): DetailRow[] {
    return [{ label: 'Type', value: 'Song' }];
  }
}

class Podcast extends Track {
  public readonly showName: string;
  public readonly episodeNumber: number;

  constructor(data: TrackData) {
    super(data);
    this.showName = data.showName ?? 'Unknown Show';
    this.episodeNumber = data.episodeNumber ?? 1;
  }

  getType(): TrackType { return 'podcast'; }
  getDetailRows(): DetailRow[] {
    return [
      { label: 'Show', value: this.showName },
      { label: 'Episode', value: String(this.episodeNumber) },
    ];
  }
}

class MusicVideo extends Track {
  public readonly director: string;
  public readonly availableRegions: string[];

  constructor(data: TrackData) {
    super(data);
    this.director = data.director ?? 'Unknown Director';
    this.availableRegions = data.availableRegions ?? [];
  }

  getType(): TrackType { return 'music_video'; }
  getDetailRows(): DetailRow[] {
    return [
      { label: 'Director', value: this.director },
      { label: 'Regions', value: this.availableRegions.join(', ') || 'None' },
    ];
  }
}

class LivePerformance extends Track {
  getType(): TrackType { return 'live_performance'; }
  getDetailRows(): DetailRow[] {
    return [{ label: 'Type', value: 'Live Performance' }];
  }
}

// --- Factory ---
type TrackConstructor = new (data: TrackData) => Track;

class TrackFactory {
  private static registry: Record<TrackType, TrackConstructor> = {
    song: Song,
    // BUG: podcast is mapped to MusicVideo instead of Podcast
    podcast: MusicVideo,
    music_video: MusicVideo,
    live_performance: LivePerformance,
  };

  static create(data: TrackData): Track {
    const Constructor = this.registry[data.type];
    if (!Constructor) return new Song(data);
    return new Constructor(data);
  }
}

export function createTrackAndGetDetails(data: TrackData): { type: TrackType; rows: DetailRow[] } {
  const track = TrackFactory.create(data);
  return { type: track.getType(), rows: track.getDetailRows() };
}`,
        solutionCode: `// --- Inline Types ---
type TrackType = 'song' | 'podcast' | 'music_video' | 'live_performance';

interface TrackData {
  id: string;
  title: string;
  type: TrackType;
  genre: string;
  showName?: string;
  episodeNumber?: number;
  director?: string;
  availableRegions?: string[];
}

interface DetailRow {
  label: string;
  value: string;
}

// --- Track classes ---
abstract class Track {
  public readonly id: string;
  public readonly title: string;
  public readonly genre: string;

  constructor(data: TrackData) {
    this.id = data.id;
    this.title = data.title;
    this.genre = data.genre;
  }

  abstract getType(): TrackType;
  abstract getDetailRows(): DetailRow[];
}

class Song extends Track {
  getType(): TrackType { return 'song'; }
  getDetailRows(): DetailRow[] {
    return [{ label: 'Type', value: 'Song' }];
  }
}

class Podcast extends Track {
  public readonly showName: string;
  public readonly episodeNumber: number;

  constructor(data: TrackData) {
    super(data);
    this.showName = data.showName ?? 'Unknown Show';
    this.episodeNumber = data.episodeNumber ?? 1;
  }

  getType(): TrackType { return 'podcast'; }
  getDetailRows(): DetailRow[] {
    return [
      { label: 'Show', value: this.showName },
      { label: 'Episode', value: String(this.episodeNumber) },
    ];
  }
}

class MusicVideo extends Track {
  public readonly director: string;
  public readonly availableRegions: string[];

  constructor(data: TrackData) {
    super(data);
    this.director = data.director ?? 'Unknown Director';
    this.availableRegions = data.availableRegions ?? [];
  }

  getType(): TrackType { return 'music_video'; }
  getDetailRows(): DetailRow[] {
    return [
      { label: 'Director', value: this.director },
      { label: 'Regions', value: this.availableRegions.join(', ') || 'None' },
    ];
  }
}

class LivePerformance extends Track {
  getType(): TrackType { return 'live_performance'; }
  getDetailRows(): DetailRow[] {
    return [{ label: 'Type', value: 'Live Performance' }];
  }
}

// --- Factory ---
type TrackConstructor = new (data: TrackData) => Track;

class TrackFactory {
  private static registry: Record<TrackType, TrackConstructor> = {
    song: Song,
    // FIX: podcast mapped to Podcast (was MusicVideo)
    podcast: Podcast,
    music_video: MusicVideo,
    live_performance: LivePerformance,
  };

  static create(data: TrackData): Track {
    const Constructor = this.registry[data.type];
    if (!Constructor) return new Song(data);
    return new Constructor(data);
  }
}

export function createTrackAndGetDetails(data: TrackData): { type: TrackType; rows: DetailRow[] } {
  const track = TrackFactory.create(data);
  return { type: track.getType(), rows: track.getDetailRows() };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'TrackFactory.test.ts',
        language: 'typescript',
        code: `import { createTrackAndGetDetails } from "./TrackFactory";

describe('Bug 2: Track Factory Registry', () => {
  it('should create a podcast with podcast-specific fields', () => {
    const result = createTrackAndGetDetails({
      id: 'TRK-003', title: 'Code & Coffee', type: 'podcast',
      genre: 'Technology', showName: 'Dev Talk Weekly', episodeNumber: 42,
    });
    expect(result.type).toBe('podcast');
  });

  it('should show Show Name in podcast detail rows', () => {
    const result = createTrackAndGetDetails({
      id: 'TRK-003', title: 'Code & Coffee', type: 'podcast',
      genre: 'Technology', showName: 'Dev Talk Weekly', episodeNumber: 42,
    });
    const showRow = result.rows.find(r => r.label === 'Show');
    expect(showRow).toBeDefined();
    expect(showRow!.value).toBe('Dev Talk Weekly');
  });

  it('should NOT show Director in podcast detail rows', () => {
    const result = createTrackAndGetDetails({
      id: 'TRK-003', title: 'Code & Coffee', type: 'podcast',
      genre: 'Technology', showName: 'Dev Talk Weekly', episodeNumber: 42,
    });
    const directorRow = result.rows.find(r => r.label === 'Director');
    expect(directorRow).toBeUndefined();
  });

  it('should still create MusicVideo for music_video type', () => {
    const result = createTrackAndGetDetails({
      id: 'TRK-004', title: 'Neon Nights', type: 'music_video',
      genre: 'Pop', director: 'James Cole', availableRegions: ['US'],
    });
    expect(result.type).toBe('music_video');
    const directorRow = result.rows.find(r => r.label === 'Director');
    expect(directorRow).toBeDefined();
  });

  it('should show Episode number in podcast detail rows', () => {
    const result = createTrackAndGetDetails({
      id: 'TRK-003', title: 'Code & Coffee', type: 'podcast',
      genre: 'Technology', showName: 'Dev Talk Weekly', episodeNumber: 42,
    });
    const epRow = result.rows.find(r => r.label === 'Episode');
    expect(epRow).toBeDefined();
    expect(epRow!.value).toBe('42');
  });
});`,
      },
    ],
    solutionExplanation: `In TrackFactory, the registry maps \`'podcast'\` to the \`MusicVideo\` class instead of the \`Podcast\` class. This means every podcast-type track is constructed as a MusicVideo instance, inheriting MusicVideo fields and behavior. The fix is to change the registry entry to map \`'podcast'\` to \`Podcast\`.`,
  },

  // -----------------------------------------------------------------------
  // Bug 3: Polymorphic this Causes Double Discount
  // -----------------------------------------------------------------------
  {
    id: 'music-streamer-3',
    project: 'music-streamer',
    projectLabel: 'Music Streamer',
    bugNumber: 3,
    title: 'Polymorphic this Causes Double Discount in Subclass',
    difficulty: 'hard',
    category: 'polymorphism',
    language: 'typescript',
    symptom: `### Symptom

Family tier stream cost is much too cheap. The discount is compounded (applied twice) resulting in ~65% off instead of the intended ~44% off.

### What you know

**FamilyTier** extends **PremiumTier**. Family subscribers should get the premium discount (20%) plus an additional family group discount (30%). The expected cost is \`baseRate * 0.8 * 0.7 = baseRate * 0.56\`, but the actual cost is \`baseRate * 0.35\`.`,
    hints: [
      'This is about how `this` resolves in a parent class method when called from a subclass.',
      'FamilyTier.calculateStreamCost() calls super.calculateStreamCost(). That parent method accesses `this.discountRate`. What value does `this.discountRate` return when `this` is a FamilyTier instance?',
      'PremiumTier.calculateStreamCost() uses `this.discountRate`, which resolves to FamilyTier\'s 0.5 (not PremiumTier\'s 0.2). So the 50% discount is applied in super, and then FamilyTier applies another 30% discount on top.',
    ],
    files: [
      {
        filename: 'Subscription.ts',
        language: 'typescript',
        buggyCode: `// --- Subscription hierarchy ---
abstract class Subscription {
  public readonly basePrice: number;
  constructor(basePrice: number) { this.basePrice = basePrice; }
  abstract getTier(): string;
  abstract getPerStreamRate(): number;
  protected abstract get discountRate(): number;

  public calculateStreamCost(baseRate: number): number {
    return baseRate;
  }
}

class PremiumTier extends Subscription {
  protected get discountRate(): number { return 0.2; }

  constructor(price = 9.99) { super(price); }

  getTier(): string { return 'premium'; }
  getPerStreamRate(): number { return 0.005; }

  override calculateStreamCost(baseRate: number): number {
    // BUG: this.discountRate resolves to FamilyTier's 0.5 when called via super from FamilyTier
    return baseRate * (1 - this.discountRate);
  }
}

class FamilyTier extends PremiumTier {
  private readonly familyDiscount = 0.3;

  protected override get discountRate(): number { return 0.5; }

  constructor() { super(14.99); }

  override getTier(): string { return 'family'; }
  override getPerStreamRate(): number { return 0.004; }

  override calculateStreamCost(baseRate: number): number {
    // BUG: super.calculateStreamCost uses this.discountRate which is 0.5 (FamilyTier's)
    // So this computes: baseRate * (1 - 0.5) * (1 - 0.3) = baseRate * 0.35 (65% off)
    // Instead of intended: baseRate * (1 - 0.2) * (1 - 0.3) = baseRate * 0.56 (44% off)
    const premiumCost = super.calculateStreamCost(baseRate);
    return premiumCost * (1 - this.familyDiscount);
  }
}

export function calculateFamilyStreamCost(baseRate: number): number {
  const family = new FamilyTier();
  return family.calculateStreamCost(baseRate);
}

export function calculatePremiumStreamCost(baseRate: number): number {
  const premium = new PremiumTier();
  return premium.calculateStreamCost(baseRate);
}`,
        solutionCode: `// --- Subscription hierarchy ---
abstract class Subscription {
  public readonly basePrice: number;
  constructor(basePrice: number) { this.basePrice = basePrice; }
  abstract getTier(): string;
  abstract getPerStreamRate(): number;
  protected abstract get discountRate(): number;

  public calculateStreamCost(baseRate: number): number {
    return baseRate;
  }
}

class PremiumTier extends Subscription {
  protected get discountRate(): number { return 0.2; }

  constructor(price = 9.99) { super(price); }

  getTier(): string { return 'premium'; }
  getPerStreamRate(): number { return 0.005; }

  override calculateStreamCost(baseRate: number): number {
    return baseRate * (1 - this.discountRate);
  }
}

class FamilyTier extends PremiumTier {
  private readonly familyDiscount = 0.3;

  protected override get discountRate(): number { return 0.5; }

  constructor() { super(14.99); }

  override getTier(): string { return 'family'; }
  override getPerStreamRate(): number { return 0.004; }

  // FIX: Calculate independently instead of calling super
  // Intent: Premium discount (20%) + family group discount (30%)
  // baseRate * (1 - 0.2) * (1 - 0.3) = baseRate * 0.56
  override calculateStreamCost(baseRate: number): number {
    const premiumDiscount = 0.2;
    return baseRate * (1 - premiumDiscount) * (1 - this.familyDiscount);
  }
}

export function calculateFamilyStreamCost(baseRate: number): number {
  const family = new FamilyTier();
  return family.calculateStreamCost(baseRate);
}

export function calculatePremiumStreamCost(baseRate: number): number {
  const premium = new PremiumTier();
  return premium.calculateStreamCost(baseRate);
}`,
      },
    ],
    testFiles: [
      {
        filename: 'Subscription.test.ts',
        language: 'typescript',
        code: `import { calculateFamilyStreamCost, calculatePremiumStreamCost } from "./Subscription";

describe('Bug 3: Family Tier Stream Cost', () => {
  it('premium tier should apply 20% discount', () => {
    const cost = calculatePremiumStreamCost(1.00);
    expect(cost).toBeCloseTo(0.80, 2);
  });

  it('family tier should apply premium discount (20%) then family discount (30%)', () => {
    // Expected: 1.00 * (1 - 0.2) * (1 - 0.3) = 0.56
    const cost = calculateFamilyStreamCost(1.00);
    expect(cost).toBeCloseTo(0.56, 2);
  });

  it('family tier should NOT be cheaper than 60% off', () => {
    // If double-discounted: 1.00 * 0.5 * 0.7 = 0.35 (65% off) -- too cheap
    const cost = calculateFamilyStreamCost(1.00);
    expect(cost).toBeGreaterThan(0.40);
  });

  it('family tier should be cheaper than premium tier', () => {
    const familyCost = calculateFamilyStreamCost(1.00);
    const premiumCost = calculatePremiumStreamCost(1.00);
    expect(familyCost).toBeLessThan(premiumCost);
  });

  it('family tier with 10.00 base rate should cost 5.60', () => {
    const cost = calculateFamilyStreamCost(10.00);
    expect(cost).toBeCloseTo(5.60, 2);
  });
});`,
      },
    ],
    solutionExplanation: `\`FamilyTier\` extends \`PremiumTier\` and overrides the \`discountRate\` getter to return 0.5. When \`FamilyTier.calculateStreamCost()\` calls \`super.calculateStreamCost(baseRate)\`, the parent method accesses \`this.discountRate\` -- but \`this\` is the FamilyTier instance, so it gets 0.5 instead of 0.2. The result is \`baseRate * (1 - 0.5) * (1 - 0.3) = baseRate * 0.35\` (65% off) instead of the intended \`baseRate * (1 - 0.2) * (1 - 0.3) = baseRate * 0.56\` (44% off). The fix is for FamilyTier to calculate independently using a local constant for the premium discount rate.`,
  },

  // -----------------------------------------------------------------------
  // Bug 4: setMonth() Used Instead of setMinutes()
  // -----------------------------------------------------------------------
  {
    id: 'music-streamer-4',
    project: 'music-streamer',
    projectLabel: 'Music Streamer',
    bugNumber: 4,
    title: 'setMonth() Used Instead of setMinutes() for Duration',
    difficulty: 'easy',
    category: 'date-api',
    language: 'typescript',
    symptom: `### Symptom

Curated playlist estimated end time shows a date months or years in the future for a playlist that's only ~17 minutes long.

### What you know

The **CuratedPlaylist** class overrides the \`estimateEndTime\` method to add the total playlist duration to the current time. The parent \`Playlist\` class has a working implementation, but the curated version produces wildly wrong dates.`,
    hints: [
      'Look at how the end time is calculated. The issue is a Date API method confusion.',
      'Compare setMinutes() with setMonth(). They do very different things.',
      'CuratedPlaylist.estimateEndTime() calls setMonth(getMonth() + totalMinutes) instead of setMinutes(getMinutes() + totalMinutes).',
    ],
    files: [
      {
        filename: 'Playlist.ts',
        language: 'typescript',
        buggyCode: `// --- Inline Types ---
interface PlaylistDurationResult {
  playlistId: string;
  playlistName: string;
  totalMinutes: number;
  estimatedEndTime: string;
}

interface PlaylistData {
  id: string;
  name: string;
  totalDurationSeconds: number;
}

// --- Playlist ---
class Playlist {
  public readonly id: string;
  public readonly name: string;
  public readonly totalDurationSeconds: number;

  constructor(data: PlaylistData) {
    this.id = data.id;
    this.name = data.name;
    this.totalDurationSeconds = data.totalDurationSeconds;
  }

  public calculateDuration(): PlaylistDurationResult {
    const totalMinutes = Math.ceil(this.totalDurationSeconds / 60);
    const estimatedEndTime = this.estimateEndTime(totalMinutes);
    return {
      playlistId: this.id,
      playlistName: this.name,
      totalMinutes,
      estimatedEndTime: estimatedEndTime.toISOString(),
    };
  }

  protected estimateEndTime(totalMinutes: number): Date {
    const now = new Date();
    now.setMinutes(now.getMinutes() + totalMinutes);
    return now;
  }
}

class CuratedPlaylist extends Playlist {
  // BUG: Uses setMonth instead of setMinutes
  protected override estimateEndTime(totalMinutes: number): Date {
    const now = new Date();
    now.setMonth(now.getMonth() + totalMinutes);
    return now;
  }
}

export function calculateCuratedPlaylistDuration(data: PlaylistData): PlaylistDurationResult {
  const playlist = new CuratedPlaylist(data);
  return playlist.calculateDuration();
}`,
        solutionCode: `// --- Inline Types ---
interface PlaylistDurationResult {
  playlistId: string;
  playlistName: string;
  totalMinutes: number;
  estimatedEndTime: string;
}

interface PlaylistData {
  id: string;
  name: string;
  totalDurationSeconds: number;
}

// --- Playlist ---
class Playlist {
  public readonly id: string;
  public readonly name: string;
  public readonly totalDurationSeconds: number;

  constructor(data: PlaylistData) {
    this.id = data.id;
    this.name = data.name;
    this.totalDurationSeconds = data.totalDurationSeconds;
  }

  public calculateDuration(): PlaylistDurationResult {
    const totalMinutes = Math.ceil(this.totalDurationSeconds / 60);
    const estimatedEndTime = this.estimateEndTime(totalMinutes);
    return {
      playlistId: this.id,
      playlistName: this.name,
      totalMinutes,
      estimatedEndTime: estimatedEndTime.toISOString(),
    };
  }

  protected estimateEndTime(totalMinutes: number): Date {
    const now = new Date();
    now.setMinutes(now.getMinutes() + totalMinutes);
    return now;
  }
}

class CuratedPlaylist extends Playlist {
  // FIX: Use setMinutes instead of setMonth
  protected override estimateEndTime(totalMinutes: number): Date {
    const now = new Date();
    now.setMinutes(now.getMinutes() + totalMinutes);
    return now;
  }
}

export function calculateCuratedPlaylistDuration(data: PlaylistData): PlaylistDurationResult {
  const playlist = new CuratedPlaylist(data);
  return playlist.calculateDuration();
}`,
      },
    ],
    testFiles: [
      {
        filename: 'Playlist.test.ts',
        language: 'typescript',
        code: `import { calculateCuratedPlaylistDuration } from "./Playlist";

describe('Bug 4: Curated Playlist End Time', () => {
  const playlistData = {
    id: 'PL-001',
    name: "Today's Hits",
    totalDurationSeconds: 600, // 10 minutes
  };

  it('should calculate total minutes correctly', () => {
    const result = calculateCuratedPlaylistDuration(playlistData);
    expect(result.totalMinutes).toBe(10);
  });

  it('should estimate end time approximately 10 minutes from now', () => {
    const result = calculateCuratedPlaylistDuration(playlistData);
    const endTime = new Date(result.estimatedEndTime);
    const now = new Date();
    const diffMinutes = Math.round((endTime.getTime() - now.getTime()) / (1000 * 60));
    expect(diffMinutes).toBeGreaterThanOrEqual(9);
    expect(diffMinutes).toBeLessThanOrEqual(11);
  });

  it('should NOT estimate end time months in the future', () => {
    const result = calculateCuratedPlaylistDuration(playlistData);
    const endTime = new Date(result.estimatedEndTime);
    const now = new Date();
    const diffDays = (endTime.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    expect(diffDays).toBeLessThan(1);
  });

  it('should handle a 17-minute playlist', () => {
    const result = calculateCuratedPlaylistDuration({
      id: 'PL-002', name: 'Short Mix', totalDurationSeconds: 1015,
    });
    expect(result.totalMinutes).toBe(17);
    const endTime = new Date(result.estimatedEndTime);
    const now = new Date();
    const diffMinutes = Math.round((endTime.getTime() - now.getTime()) / (1000 * 60));
    expect(diffMinutes).toBeGreaterThanOrEqual(16);
    expect(diffMinutes).toBeLessThanOrEqual(18);
  });

  it('should produce a valid ISO date string', () => {
    const result = calculateCuratedPlaylistDuration(playlistData);
    const parsed = new Date(result.estimatedEndTime);
    expect(parsed.getTime()).not.toBeNaN();
  });
});`,
      },
    ],
    solutionExplanation: `\`CuratedPlaylist.estimateEndTime()\` uses \`date.setMonth()\` instead of \`date.setMinutes()\`. Adding the total minutes value (e.g. 17) as months makes the date jump 17 months into the future. The fix is simply to use \`setMinutes(getMinutes() + totalMinutes)\`.`,
  },

  // -----------------------------------------------------------------------
  // Bug 5: >= 0 Always True for Array Length
  // -----------------------------------------------------------------------
  {
    id: 'music-streamer-5',
    project: 'music-streamer',
    projectLabel: 'Music Streamer',
    bugNumber: 5,
    title: 'Off-by-One: >= 0 Always True for Array Length',
    difficulty: 'easy',
    category: 'comparison-logic',
    language: 'typescript',
    symptom: `### Symptom

Restricted music videos with zero available regions show as "Streamable: Yes". Videos that should not be streamable in any region are incorrectly marked as available.

### What you know

The **MusicVideo** class has an \`isStreamable()\` method that checks the \`availableRegions\` array. Even when the array is empty, the method returns \`true\`.`,
    hints: [
      'Look at the condition that determines streamability. Is the comparison operator correct?',
      'What does array.length >= 0 evaluate to when the array is empty?',
      'MusicVideo.isStreamable() uses >= instead of >. Since [].length is 0, and 0 >= 0 is true, empty regions arrays pass the check.',
    ],
    files: [
      {
        filename: 'MusicVideo.ts',
        language: 'typescript',
        buggyCode: `// --- Inline Types ---
interface TrackData {
  id: string;
  title: string;
  genre: string;
  status: string;
  director?: string;
  availableRegions?: string[];
}

class MusicVideo {
  public readonly id: string;
  public readonly title: string;
  public readonly director: string;
  public readonly availableRegions: string[];
  public readonly status: string;

  constructor(data: TrackData) {
    this.id = data.id;
    this.title = data.title;
    this.director = data.director ?? 'Unknown Director';
    this.availableRegions = data.availableRegions ?? [];
    this.status = data.status;
  }

  // BUG: >= 0 is always true because length is never negative
  isStreamable(): boolean {
    return this.availableRegions.length >= 0;
  }

  getStreamableLabel(): string {
    return this.isStreamable() ? 'Yes' : 'No';
  }
}

export function checkStreamable(data: TrackData): { streamable: boolean; label: string } {
  const mv = new MusicVideo(data);
  return { streamable: mv.isStreamable(), label: mv.getStreamableLabel() };
}`,
        solutionCode: `// --- Inline Types ---
interface TrackData {
  id: string;
  title: string;
  genre: string;
  status: string;
  director?: string;
  availableRegions?: string[];
}

class MusicVideo {
  public readonly id: string;
  public readonly title: string;
  public readonly director: string;
  public readonly availableRegions: string[];
  public readonly status: string;

  constructor(data: TrackData) {
    this.id = data.id;
    this.title = data.title;
    this.director = data.director ?? 'Unknown Director';
    this.availableRegions = data.availableRegions ?? [];
    this.status = data.status;
  }

  // FIX: Use > 0 instead of >= 0
  isStreamable(): boolean {
    return this.availableRegions.length > 0;
  }

  getStreamableLabel(): string {
    return this.isStreamable() ? 'Yes' : 'No';
  }
}

export function checkStreamable(data: TrackData): { streamable: boolean; label: string } {
  const mv = new MusicVideo(data);
  return { streamable: mv.isStreamable(), label: mv.getStreamableLabel() };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'MusicVideo.test.ts',
        language: 'typescript',
        code: `import { checkStreamable } from "./MusicVideo";

describe('Bug 5: MusicVideo Streamable Check', () => {
  it('should be streamable when regions are available', () => {
    const result = checkStreamable({
      id: 'TRK-004', title: 'Neon Nights', genre: 'Pop', status: 'published',
      director: 'James Cole', availableRegions: ['US', 'UK'],
    });
    expect(result.streamable).toBe(true);
    expect(result.label).toBe('Yes');
  });

  it('should NOT be streamable when regions array is empty', () => {
    const result = checkStreamable({
      id: 'TRK-008', title: 'Acoustic Session', genre: 'Indie', status: 'restricted',
      director: 'Sarah Lin', availableRegions: [],
    });
    expect(result.streamable).toBe(false);
    expect(result.label).toBe('No');
  });

  it('should NOT be streamable when regions is undefined (defaults to empty)', () => {
    const result = checkStreamable({
      id: 'TRK-009', title: 'Unreleased', genre: 'Pop', status: 'draft',
    });
    expect(result.streamable).toBe(false);
  });

  it('should be streamable with a single region', () => {
    const result = checkStreamable({
      id: 'TRK-010', title: 'Limited', genre: 'Pop', status: 'published',
      availableRegions: ['US'],
    });
    expect(result.streamable).toBe(true);
  });

  it('should return correct label for non-streamable video', () => {
    const result = checkStreamable({
      id: 'TRK-011', title: 'Region Locked', genre: 'Rock', status: 'restricted',
      availableRegions: [],
    });
    expect(result.label).toBe('No');
  });
});`,
      },
    ],
    solutionExplanation: `\`MusicVideo.isStreamable()\` checks \`this.availableRegions.length >= 0\`, which is always \`true\` because \`.length\` is always >= 0. The fix is to use \`> 0\` to correctly report non-streamable when regions are empty.`,
  },

  // -----------------------------------------------------------------------
  // Bug 6: useEffect Missing Dependencies
  // -----------------------------------------------------------------------
  {
    id: 'music-streamer-6',
    project: 'music-streamer',
    projectLabel: 'Music Streamer',
    bugNumber: 6,
    title: 'Missing Dependencies in useEffect Prevents Filter Updates',
    difficulty: 'medium',
    category: 'react-hooks',
    language: 'typescript',
    symptom: `### Symptom

Changing the genre or type filter dropdowns does not update the catalog. The track list stays the same regardless of which filter values are selected.

### What you know

The catalog uses a hook pattern where a data-fetching effect should re-run when filter state changes. The effect fetches tracks based on \`genreFilter\` and \`typeFilter\` state values. The dependency array only tracks a static client value.`,
    hints: [
      'This is a React hook issue. The data fetching effect isn\'t re-running when it should.',
      'Look at the useEffect dependency array in useCatalog. What triggers a re-fetch?',
      'The dependency array is [client], but genreFilter and typeFilter are not included. When these state values change, the effect doesn\'t re-run.',
    ],
    files: [
      {
        filename: 'UseCatalog.ts',
        language: 'typescript',
        buggyCode: `// --- Simplified React hook simulation ---
// In the browser sandbox, we simulate the concept without actual React

interface FetchParams {
  type?: string;
  genre?: string;
}

interface TrackData {
  id: string;
  title: string;
  type: string;
  genre: string;
}

const allTracks: TrackData[] = [
  { id: '1', title: 'Song A', type: 'song', genre: 'Pop' },
  { id: '2', title: 'Song B', type: 'song', genre: 'Rock' },
  { id: '3', title: 'Podcast C', type: 'podcast', genre: 'Technology' },
  { id: '4', title: 'Video D', type: 'music_video', genre: 'Pop' },
];

function fetchTracks(params: FetchParams): TrackData[] {
  let result = [...allTracks];
  if (params.type) result = result.filter(t => t.type === params.type);
  if (params.genre) result = result.filter(t => t.genre === params.genre);
  return result;
}

// Simulates the useEffect dependency array logic
// The effect only re-runs when values in the dependency array change
class CatalogHook {
  private tracks: TrackData[] = [];
  private genreFilter: string = 'all';
  private typeFilter: string = 'all';
  private lastEffectDeps: string = '';

  constructor() {
    this.runEffect();
  }

  // BUG: Effect dependencies only check a static value, not the filters
  private getEffectDeps(): string {
    // Simulates [client] -- filters are NOT in the dependency array
    return 'client-v1';
  }

  private runEffect(): void {
    const type = this.typeFilter !== 'all' ? this.typeFilter : undefined;
    const genre = this.genreFilter !== 'all' ? this.genreFilter : undefined;
    this.tracks = fetchTracks({ type, genre });
  }

  private maybeRerunEffect(): void {
    const deps = this.getEffectDeps();
    if (deps !== this.lastEffectDeps) {
      this.lastEffectDeps = deps;
      this.runEffect();
    }
    // BUG: If deps haven't changed, effect doesn't re-run even though filters changed
  }

  setGenre(genre: string): void {
    this.genreFilter = genre;
    this.maybeRerunEffect();
  }

  setType(type: string): void {
    this.typeFilter = type;
    this.maybeRerunEffect();
  }

  getTracks(): TrackData[] {
    return this.tracks;
  }
}

export function simulateCatalogFiltering(): { afterGenreFilter: number; afterTypeFilter: number } {
  const hook = new CatalogHook();

  hook.setGenre('Pop');
  const afterGenreFilter = hook.getTracks().length;

  hook.setType('song');
  const afterTypeFilter = hook.getTracks().length;

  return { afterGenreFilter, afterTypeFilter };
}`,
        solutionCode: `// --- Simplified React hook simulation ---

interface FetchParams {
  type?: string;
  genre?: string;
}

interface TrackData {
  id: string;
  title: string;
  type: string;
  genre: string;
}

const allTracks: TrackData[] = [
  { id: '1', title: 'Song A', type: 'song', genre: 'Pop' },
  { id: '2', title: 'Song B', type: 'song', genre: 'Rock' },
  { id: '3', title: 'Podcast C', type: 'podcast', genre: 'Technology' },
  { id: '4', title: 'Video D', type: 'music_video', genre: 'Pop' },
];

function fetchTracks(params: FetchParams): TrackData[] {
  let result = [...allTracks];
  if (params.type) result = result.filter(t => t.type === params.type);
  if (params.genre) result = result.filter(t => t.genre === params.genre);
  return result;
}

class CatalogHook {
  private tracks: TrackData[] = [];
  private genreFilter: string = 'all';
  private typeFilter: string = 'all';
  private lastEffectDeps: string = '';

  constructor() {
    this.runEffect();
  }

  // FIX: Include genreFilter and typeFilter in dependencies
  private getEffectDeps(): string {
    return \`client-v1|\${this.genreFilter}|\${this.typeFilter}\`;
  }

  private runEffect(): void {
    const type = this.typeFilter !== 'all' ? this.typeFilter : undefined;
    const genre = this.genreFilter !== 'all' ? this.genreFilter : undefined;
    this.tracks = fetchTracks({ type, genre });
  }

  private maybeRerunEffect(): void {
    const deps = this.getEffectDeps();
    if (deps !== this.lastEffectDeps) {
      this.lastEffectDeps = deps;
      this.runEffect();
    }
  }

  setGenre(genre: string): void {
    this.genreFilter = genre;
    this.maybeRerunEffect();
  }

  setType(type: string): void {
    this.typeFilter = type;
    this.maybeRerunEffect();
  }

  getTracks(): TrackData[] {
    return this.tracks;
  }
}

export function simulateCatalogFiltering(): { afterGenreFilter: number; afterTypeFilter: number } {
  const hook = new CatalogHook();

  hook.setGenre('Pop');
  const afterGenreFilter = hook.getTracks().length;

  hook.setType('song');
  const afterTypeFilter = hook.getTracks().length;

  return { afterGenreFilter, afterTypeFilter };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'UseCatalog.test.ts',
        language: 'typescript',
        code: `import { simulateCatalogFiltering } from "./UseCatalog";

describe('Bug 6: Catalog Filter Updates', () => {
  it('should filter tracks when genre is changed', () => {
    const result = simulateCatalogFiltering();
    // 'Pop' genre: Song A + Video D = 2
    expect(result.afterGenreFilter).toBe(2);
  });

  it('should filter tracks when type is changed after genre', () => {
    const result = simulateCatalogFiltering();
    // Genre 'Pop' + Type 'song': only Song A = 1
    expect(result.afterTypeFilter).toBe(1);
  });

  it('should not return all 4 tracks after filtering by genre', () => {
    const result = simulateCatalogFiltering();
    expect(result.afterGenreFilter).not.toBe(4);
  });

  it('should not return all 4 tracks after filtering by type', () => {
    const result = simulateCatalogFiltering();
    expect(result.afterTypeFilter).not.toBe(4);
  });
});`,
      },
    ],
    solutionExplanation: `The \`useEffect\` in \`useCatalog\` only lists \`[client]\` in its dependency array. The \`genreFilter\` and \`typeFilter\` state variables are used inside the effect but not listed as dependencies, so React doesn't re-run the effect when they change. The fix is to include both filter values in the dependency array so the effect re-runs whenever a filter changes.`,
  },

  // -----------------------------------------------------------------------
  // Bug 7: Lost this Binding in Error Handler Callback
  // -----------------------------------------------------------------------
  {
    id: 'music-streamer-7',
    project: 'music-streamer',
    projectLabel: 'Music Streamer',
    bugNumber: 7,
    title: '.catch(this.handleError) Loses this Context',
    difficulty: 'medium',
    category: 'this-binding',
    language: 'typescript',
    symptom: `### Symptom

Adding a track to a playlist crashes with \`Cannot read properties of undefined (reading 'clientName')\`. The error handler fails instead of producing a formatted error message.

### What you know

The **PlaylistApiClient** extends **BaseApiClient**. The \`addTrack\` method calls an API and uses a \`.catch()\` handler to format errors. The error handler accesses \`this.clientName\`, but \`this\` is \`undefined\` when it runs.`,
    hints: [
      'The error says "Cannot read properties of undefined (reading \'clientName\')". Where is clientName defined?',
      'Look at how .catch() is called in PlaylistApiClient.addTrack(). How is `this` bound?',
      '.catch(this.handleError) passes handleError as a callback, losing the `this` binding. When it executes, `this` is undefined, so this.clientName throws. Use .catch(e => this.handleError(e)) instead.',
    ],
    files: [
      {
        filename: 'ApiClient.ts',
        language: 'typescript',
        buggyCode: `// --- API Client hierarchy ---
class BaseApiClient {
  protected readonly clientName: string;

  constructor(clientName: string) {
    this.clientName = clientName;
  }

  protected async post<T>(path: string, body: unknown): Promise<T> {
    // Simulate a failed API call
    throw new Error(\`POST \${path} failed with 500\`);
  }

  public handleError(error: Error): never {
    // BUG: When called as a callback, 'this' is undefined
    const message = \`[\${this.clientName}] Error: \${error.message}\`;
    throw new Error(message);
  }
}

class PlaylistApiClient extends BaseApiClient {
  constructor() {
    super('PlaylistApiClient');
  }

  async addTrack(playlistId: string, trackId: string): Promise<{ success: boolean }> {
    // BUG: .catch(this.handleError) loses 'this' binding
    return this.post<{ success: boolean }>(\`/playlists/\${playlistId}/tracks\`, { trackId })
      .catch(this.handleError);
  }
}

export async function attemptAddTrack(): Promise<string> {
  const client = new PlaylistApiClient();
  try {
    await client.addTrack('PL-001', 'TRK-001');
    return 'success';
  } catch (e: any) {
    return e.message;
  }
}`,
        solutionCode: `// --- API Client hierarchy ---
class BaseApiClient {
  protected readonly clientName: string;

  constructor(clientName: string) {
    this.clientName = clientName;
  }

  protected async post<T>(path: string, body: unknown): Promise<T> {
    // Simulate a failed API call
    throw new Error(\`POST \${path} failed with 500\`);
  }

  public handleError(error: Error): never {
    const message = \`[\${this.clientName}] Error: \${error.message}\`;
    throw new Error(message);
  }
}

class PlaylistApiClient extends BaseApiClient {
  constructor() {
    super('PlaylistApiClient');
  }

  async addTrack(playlistId: string, trackId: string): Promise<{ success: boolean }> {
    // FIX: Use arrow function to preserve 'this' binding
    return this.post<{ success: boolean }>(\`/playlists/\${playlistId}/tracks\`, { trackId })
      .catch(e => this.handleError(e));
  }
}

export async function attemptAddTrack(): Promise<string> {
  const client = new PlaylistApiClient();
  try {
    await client.addTrack('PL-001', 'TRK-001');
    return 'success';
  } catch (e: any) {
    return e.message;
  }
}`,
      },
    ],
    testFiles: [
      {
        filename: 'ApiClient.test.ts',
        language: 'typescript',
        code: `import { attemptAddTrack } from "./ApiClient";

describe('Bug 7: Error Handler this Binding', () => {
  it('should include client name in error message', async () => {
    const message = await attemptAddTrack();
    expect(message).toContain('PlaylistApiClient');
  });

  it('should NOT throw TypeError about reading clientName', async () => {
    const message = await attemptAddTrack();
    expect(message).not.toContain('Cannot read properties of undefined');
  });

  it('should include the original error details', async () => {
    const message = await attemptAddTrack();
    expect(message).toContain('failed with 500');
  });

  it('should format the error with brackets around client name', async () => {
    const message = await attemptAddTrack();
    expect(message).toContain('[PlaylistApiClient]');
  });
});`,
      },
    ],
    solutionExplanation: `In \`PlaylistApiClient.addTrack()\`, \`.catch(this.handleError)\` passes the method as a bare function reference, losing the \`this\` binding. When the error handler runs, \`this\` is \`undefined\`, so accessing \`this.clientName\` throws a TypeError. The fix is to use an arrow function: \`.catch(e => this.handleError(e))\`, which preserves the lexical \`this\`.`,
  },

  // -----------------------------------------------------------------------
  // Bug 8: Inverted Comparison Gives Bonus to Wrong Artists
  // -----------------------------------------------------------------------
  {
    id: 'music-streamer-8',
    project: 'music-streamer',
    projectLabel: 'Music Streamer',
    bugNumber: 8,
    title: 'Inverted Comparison Gives Bonus to Wrong Artists',
    difficulty: 'easy',
    category: 'comparison-logic',
    language: 'typescript',
    symptom: `### Symptom

Small/indie artists with fewer than 1M monthly listeners get the popularity bonus, while major artists with more than 1M monthly listeners do not. The bonus is going to the wrong group.

### What you know

The **StreamRoyaltyCalculator** applies a popularity bonus to artists who exceed a threshold of 1,000,000 monthly listeners. But the bonus consistently goes to small artists instead of popular ones.`,
    hints: [
      'The bonus logic has an inverted condition. Think about which direction the comparison should go.',
      'Look at StreamRoyalty.applyPopularityBonus(). What does the comparison check?',
      'The condition is artist.monthlyListeners < this.popularityThreshold -- this gives the bonus to artists BELOW the threshold. It should be > to reward popular artists.',
    ],
    files: [
      {
        filename: 'RoyaltyCalculator.ts',
        language: 'typescript',
        buggyCode: `// --- Inline Types ---
interface ArtistData {
  id: string;
  name: string;
  monthlyListeners: number;
  totalStreams: number;
}

interface RoyaltyResult {
  artistId: string;
  artistName: string;
  totalStreams: number;
  grossRevenue: number;
  platformFee: number;
  netRevenue: number;
  bonusApplied: boolean;
  bonusAmount: number;
}

class StreamRoyaltyCalculator {
  private readonly popularityThreshold = 1_000_000;
  private readonly perStreamRate = 0.003;
  private readonly platformFeeRate = 0.30;

  calculate(artist: ArtistData): RoyaltyResult {
    const grossRevenue = artist.totalStreams * this.perStreamRate;
    const platformFee = grossRevenue * this.platformFeeRate;
    const bonus = this.applyPopularityBonus(artist);
    const netRevenue = grossRevenue - platformFee + bonus;

    return {
      artistId: artist.id,
      artistName: artist.name,
      totalStreams: artist.totalStreams,
      grossRevenue: Math.round(grossRevenue * 100) / 100,
      platformFee: Math.round(platformFee * 100) / 100,
      netRevenue: Math.round(netRevenue * 100) / 100,
      bonusApplied: bonus > 0,
      bonusAmount: Math.round(bonus * 100) / 100,
    };
  }

  // BUG: < should be > -- gives bonus to artists BELOW threshold
  private applyPopularityBonus(artist: ArtistData): number {
    if (artist.monthlyListeners < this.popularityThreshold) {
      return artist.totalStreams * 0.001;
    }
    return 0;
  }
}

export function calculateRoyalties(artists: ArtistData[]): RoyaltyResult[] {
  const calc = new StreamRoyaltyCalculator();
  return artists.map(a => calc.calculate(a));
}`,
        solutionCode: `// --- Inline Types ---
interface ArtistData {
  id: string;
  name: string;
  monthlyListeners: number;
  totalStreams: number;
}

interface RoyaltyResult {
  artistId: string;
  artistName: string;
  totalStreams: number;
  grossRevenue: number;
  platformFee: number;
  netRevenue: number;
  bonusApplied: boolean;
  bonusAmount: number;
}

class StreamRoyaltyCalculator {
  private readonly popularityThreshold = 1_000_000;
  private readonly perStreamRate = 0.003;
  private readonly platformFeeRate = 0.30;

  calculate(artist: ArtistData): RoyaltyResult {
    const grossRevenue = artist.totalStreams * this.perStreamRate;
    const platformFee = grossRevenue * this.platformFeeRate;
    const bonus = this.applyPopularityBonus(artist);
    const netRevenue = grossRevenue - platformFee + bonus;

    return {
      artistId: artist.id,
      artistName: artist.name,
      totalStreams: artist.totalStreams,
      grossRevenue: Math.round(grossRevenue * 100) / 100,
      platformFee: Math.round(platformFee * 100) / 100,
      netRevenue: Math.round(netRevenue * 100) / 100,
      bonusApplied: bonus > 0,
      bonusAmount: Math.round(bonus * 100) / 100,
    };
  }

  // FIX: > instead of < -- bonus goes to artists ABOVE threshold
  private applyPopularityBonus(artist: ArtistData): number {
    if (artist.monthlyListeners > this.popularityThreshold) {
      return artist.totalStreams * 0.001;
    }
    return 0;
  }
}

export function calculateRoyalties(artists: ArtistData[]): RoyaltyResult[] {
  const calc = new StreamRoyaltyCalculator();
  return artists.map(a => calc.calculate(a));
}`,
      },
    ],
    testFiles: [
      {
        filename: 'RoyaltyCalculator.test.ts',
        language: 'typescript',
        code: `import { calculateRoyalties } from "./RoyaltyCalculator";

describe('Bug 8: Popularity Bonus Direction', () => {
  const majorArtist = {
    id: 'ART-001', name: 'Luna Ray', monthlyListeners: 2_500_000, totalStreams: 45_000_000,
  };
  const indieArtist = {
    id: 'ART-003', name: 'Dev Talk', monthlyListeners: 45_000, totalStreams: 500_000,
  };

  it('should give popularity bonus to major artists (above 1M listeners)', () => {
    const results = calculateRoyalties([majorArtist]);
    expect(results[0].bonusApplied).toBe(true);
    expect(results[0].bonusAmount).toBeGreaterThan(0);
  });

  it('should NOT give popularity bonus to indie artists (below 1M listeners)', () => {
    const results = calculateRoyalties([indieArtist]);
    expect(results[0].bonusApplied).toBe(false);
    expect(results[0].bonusAmount).toBe(0);
  });

  it('major artist net revenue should include bonus amount', () => {
    const results = calculateRoyalties([majorArtist]);
    const expectedGross = majorArtist.totalStreams * 0.003;
    const expectedFee = expectedGross * 0.30;
    const expectedBonus = majorArtist.totalStreams * 0.001;
    const expectedNet = Math.round((expectedGross - expectedFee + expectedBonus) * 100) / 100;
    expect(results[0].netRevenue).toBe(expectedNet);
  });

  it('indie artist should not have bonus in net revenue', () => {
    const results = calculateRoyalties([indieArtist]);
    const expectedGross = indieArtist.totalStreams * 0.003;
    const expectedFee = expectedGross * 0.30;
    const expectedNet = Math.round((expectedGross - expectedFee) * 100) / 100;
    expect(results[0].netRevenue).toBe(expectedNet);
  });
});`,
      },
    ],
    solutionExplanation: `\`StreamRoyaltyCalculator.applyPopularityBonus()\` checks \`artist.monthlyListeners < this.popularityThreshold\`. This gives the bonus to artists BELOW the threshold (unpopular artists) instead of above it (popular artists). The fix is to change \`<\` to \`>\`.`,
  },

  // -----------------------------------------------------------------------
  // Bug 9: Decorator Calls findAll() Instead of findByType()
  // -----------------------------------------------------------------------
  {
    id: 'music-streamer-9',
    project: 'music-streamer',
    projectLabel: 'Music Streamer',
    bugNumber: 9,
    title: 'LoggingRepository Calls findAll() Instead of findByType()',
    difficulty: 'medium',
    category: 'decorator',
    language: 'typescript',
    symptom: `### Symptom

Filtering artists by type via the API returns ALL artists regardless of the type parameter. The filter appears to have no effect.

### What you know

The repository uses a **Decorator pattern** where a \`LoggingRepository\` wraps an \`InMemoryRepository\`. The logging decorator logs the correct operation name but delegates to the wrong inner method.`,
    hints: [
      'The filtering happens in a repository decorator. Check the chain of decorators wrapping the artist repository.',
      'Look at LoggingRepository.findByType(). Does it delegate correctly?',
      'LoggingRepository.findByType() calls this.inner.findAll() instead of this.inner.findByType(type).',
    ],
    files: [
      {
        filename: 'Repository.ts',
        language: 'typescript',
        buggyCode: `// --- Repository Pattern ---
interface HasId { id: string; }

abstract class Repository<T extends HasId> {
  abstract findAll(): T[];
  abstract findById(id: string): T | undefined;
  abstract findByType(type: string): T[];
  abstract add(item: T): void;
}

class InMemoryRepository<T extends HasId & { type?: string }> extends Repository<T> {
  private items: T[];

  constructor(initialItems: T[] = []) {
    super();
    this.items = [...initialItems];
  }

  findAll(): T[] { return [...this.items]; }
  findById(id: string): T | undefined { return this.items.find(item => item.id === id); }
  findByType(type: string): T[] { return this.items.filter(item => item.type === type); }
  add(item: T): void { this.items.push(item); }
}

// --- Decorator ---
abstract class RepositoryDecorator<T extends HasId> extends Repository<T> {
  protected readonly inner: Repository<T>;
  constructor(inner: Repository<T>) { super(); this.inner = inner; }

  findAll(): T[] { return this.inner.findAll(); }
  findById(id: string): T | undefined { return this.inner.findById(id); }
  findByType(type: string): T[] { return this.inner.findByType(type); }
  add(item: T): void { this.inner.add(item); }
}

class LoggingRepository<T extends HasId> extends RepositoryDecorator<T> {
  private readonly label: string;
  public readonly log: string[] = [];

  constructor(inner: Repository<T>, label: string) {
    super(inner);
    this.label = label;
  }

  override findAll(): T[] {
    this.log.push(\`[\${this.label}] findAll()\`);
    return this.inner.findAll();
  }

  override findById(id: string): T | undefined {
    this.log.push(\`[\${this.label}] findById(\${id})\`);
    return this.inner.findById(id);
  }

  // BUG: Calls findAll() instead of findByType(type)
  override findByType(type: string): T[] {
    this.log.push(\`[\${this.label}] findByType(\${type})\`);
    return this.inner.findAll();
  }

  override add(item: T): void {
    this.log.push(\`[\${this.label}] add(\${item.id})\`);
    this.inner.add(item);
  }
}

interface ArtistItem {
  id: string;
  name: string;
  type: string;
}

export function filterArtistsByType(artists: ArtistItem[], type: string): ArtistItem[] {
  const repo = new InMemoryRepository(artists);
  const logged = new LoggingRepository(repo, 'artists');
  return logged.findByType(type);
}`,
        solutionCode: `// --- Repository Pattern ---
interface HasId { id: string; }

abstract class Repository<T extends HasId> {
  abstract findAll(): T[];
  abstract findById(id: string): T | undefined;
  abstract findByType(type: string): T[];
  abstract add(item: T): void;
}

class InMemoryRepository<T extends HasId & { type?: string }> extends Repository<T> {
  private items: T[];

  constructor(initialItems: T[] = []) {
    super();
    this.items = [...initialItems];
  }

  findAll(): T[] { return [...this.items]; }
  findById(id: string): T | undefined { return this.items.find(item => item.id === id); }
  findByType(type: string): T[] { return this.items.filter(item => item.type === type); }
  add(item: T): void { this.items.push(item); }
}

// --- Decorator ---
abstract class RepositoryDecorator<T extends HasId> extends Repository<T> {
  protected readonly inner: Repository<T>;
  constructor(inner: Repository<T>) { super(); this.inner = inner; }

  findAll(): T[] { return this.inner.findAll(); }
  findById(id: string): T | undefined { return this.inner.findById(id); }
  findByType(type: string): T[] { return this.inner.findByType(type); }
  add(item: T): void { this.inner.add(item); }
}

class LoggingRepository<T extends HasId> extends RepositoryDecorator<T> {
  private readonly label: string;
  public readonly log: string[] = [];

  constructor(inner: Repository<T>, label: string) {
    super(inner);
    this.label = label;
  }

  override findAll(): T[] {
    this.log.push(\`[\${this.label}] findAll()\`);
    return this.inner.findAll();
  }

  override findById(id: string): T | undefined {
    this.log.push(\`[\${this.label}] findById(\${id})\`);
    return this.inner.findById(id);
  }

  // FIX: Delegate to findByType instead of findAll
  override findByType(type: string): T[] {
    this.log.push(\`[\${this.label}] findByType(\${type})\`);
    return this.inner.findByType(type);
  }

  override add(item: T): void {
    this.log.push(\`[\${this.label}] add(\${item.id})\`);
    this.inner.add(item);
  }
}

interface ArtistItem {
  id: string;
  name: string;
  type: string;
}

export function filterArtistsByType(artists: ArtistItem[], type: string): ArtistItem[] {
  const repo = new InMemoryRepository(artists);
  const logged = new LoggingRepository(repo, 'artists');
  return logged.findByType(type);
}`,
      },
    ],
    testFiles: [
      {
        filename: 'Repository.test.ts',
        language: 'typescript',
        code: `import { filterArtistsByType } from "./Repository";

describe('Bug 9: LoggingRepository findByType Delegation', () => {
  const artists = [
    { id: 'ART-001', name: 'Luna Ray', type: 'solo' },
    { id: 'ART-002', name: 'The Voltage', type: 'band' },
    { id: 'ART-003', name: 'Dev Talk', type: 'solo' },
    { id: 'ART-004', name: 'Ambient Wave', type: 'solo' },
  ];

  it('should return only band-type artists when filtering by "band"', () => {
    const result = filterArtistsByType(artists, 'band');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('The Voltage');
  });

  it('should return only solo-type artists when filtering by "solo"', () => {
    const result = filterArtistsByType(artists, 'solo');
    expect(result).toHaveLength(3);
  });

  it('should NOT return all 4 artists when filtering by type', () => {
    const result = filterArtistsByType(artists, 'band');
    expect(result.length).not.toBe(artists.length);
  });

  it('should return empty array for non-existent type', () => {
    const result = filterArtistsByType(artists, 'nonexistent');
    expect(result).toHaveLength(0);
  });

  it('should only include artists matching the requested type', () => {
    const result = filterArtistsByType(artists, 'solo');
    const allSolo = result.every(a => a.type === 'solo');
    expect(allSolo).toBe(true);
  });
});`,
      },
    ],
    solutionExplanation: `\`LoggingRepository.findByType()\` calls \`this.inner.findAll()\` instead of \`this.inner.findByType(type)\`. It logs the correct operation name ("findByType") but delegates to the wrong inner method, returning all items unfiltered. The fix is to change the delegation to \`this.inner.findByType(type)\`.`,
  },

  // -----------------------------------------------------------------------
  // Bug 10: Missing Null Check Crashes on Undefined Property
  // -----------------------------------------------------------------------
  {
    id: 'music-streamer-10',
    project: 'music-streamer',
    projectLabel: 'Music Streamer',
    bugNumber: 10,
    title: 'Accessing .map() on Potentially Undefined setlist',
    difficulty: 'easy',
    category: 'null-safety',
    language: 'typescript',
    symptom: `### Symptom

Clicking on a Live Performance track crashes with \`Cannot read properties of undefined (reading 'map')\`. The page fails to render the track details.

### What you know

The **LivePerformanceCard** renders detail rows including a setlist. The track data comes from an API that does not always include a \`setlist\` field. The card model accesses \`this.data.setlist\` and calls \`.map()\` on it directly.`,
    hints: [
      'The error is about .map() being called on undefined. Look at what data the card model accesses.',
      'LivePerformanceCard.detailRows() accesses this.data.setlist and calls .map() on it. But the track data doesn\'t have a setlist field.',
      'The code uses this.data.setlist.map(...) without checking if setlist exists. Add optional chaining or provide a fallback.',
    ],
    files: [
      {
        filename: 'LivePerformanceCard.ts',
        language: 'typescript',
        buggyCode: `// --- Inline Types ---
interface TrackData {
  id: string;
  title: string;
  genre: string;
  venue?: string;
  recordedDate?: string;
  setlist?: string[];
  durationSeconds: number;
  playCount: number;
}

interface DetailRow {
  label: string;
  value: string;
}

class LivePerformanceCard {
  private readonly data: TrackData;

  constructor(data: TrackData) {
    this.data = data;
  }

  detailRows(): DetailRow[] {
    // BUG: this.data.setlist can be undefined -- .map() will throw TypeError
    const setlistDisplay = (this.data.setlist as string[])
      .map((song: string, i: number) => \`\${i + 1}. \${song}\`)
      .join(', ');

    return [
      { label: 'Venue', value: this.data.venue ?? 'Unknown Venue' },
      { label: 'Recorded', value: this.data.recordedDate ?? '-' },
      { label: 'Setlist', value: setlistDisplay || 'Not available' },
      { label: 'Genre', value: this.data.genre },
    ];
  }
}

export function getLivePerformanceDetails(data: TrackData): DetailRow[] {
  const card = new LivePerformanceCard(data);
  return card.detailRows();
}`,
        solutionCode: `// --- Inline Types ---
interface TrackData {
  id: string;
  title: string;
  genre: string;
  venue?: string;
  recordedDate?: string;
  setlist?: string[];
  durationSeconds: number;
  playCount: number;
}

interface DetailRow {
  label: string;
  value: string;
}

class LivePerformanceCard {
  private readonly data: TrackData;

  constructor(data: TrackData) {
    this.data = data;
  }

  detailRows(): DetailRow[] {
    // FIX: Use nullish coalescing to provide empty array fallback
    const setlistDisplay = (this.data.setlist ?? [])
      .map((song: string, i: number) => \`\${i + 1}. \${song}\`)
      .join(', ');

    return [
      { label: 'Venue', value: this.data.venue ?? 'Unknown Venue' },
      { label: 'Recorded', value: this.data.recordedDate ?? '-' },
      { label: 'Setlist', value: setlistDisplay || 'Not available' },
      { label: 'Genre', value: this.data.genre },
    ];
  }
}

export function getLivePerformanceDetails(data: TrackData): DetailRow[] {
  const card = new LivePerformanceCard(data);
  return card.detailRows();
}`,
      },
    ],
    testFiles: [
      {
        filename: 'LivePerformanceCard.test.ts',
        language: 'typescript',
        code: `import { getLivePerformanceDetails } from "./LivePerformanceCard";

describe('Bug 10: Live Performance Card with Missing Setlist', () => {
  it('should NOT crash when setlist is undefined', () => {
    const data = {
      id: 'TRK-005', title: 'Live at Red Rocks', genre: 'Rock',
      venue: 'Red Rocks Amphitheatre', recordedDate: '2024-07-04',
      durationSeconds: 5400, playCount: 120000,
    };
    expect(() => getLivePerformanceDetails(data)).not.toThrow();
  });

  it('should show "Not available" when setlist is missing', () => {
    const data = {
      id: 'TRK-005', title: 'Live at Red Rocks', genre: 'Rock',
      venue: 'Red Rocks Amphitheatre', durationSeconds: 5400, playCount: 120000,
    };
    const rows = getLivePerformanceDetails(data);
    const setlistRow = rows.find(r => r.label === 'Setlist');
    expect(setlistRow?.value).toBe('Not available');
  });

  it('should display setlist when provided', () => {
    const data = {
      id: 'TRK-005', title: 'Live at Red Rocks', genre: 'Rock',
      venue: 'Red Rocks Amphitheatre', durationSeconds: 5400, playCount: 120000,
      setlist: ['Thunder Road', 'Electric Nights', 'Encore'],
    };
    const rows = getLivePerformanceDetails(data);
    const setlistRow = rows.find(r => r.label === 'Setlist');
    expect(setlistRow?.value).toContain('Thunder Road');
    expect(setlistRow?.value).toContain('1.');
  });

  it('should show venue correctly', () => {
    const data = {
      id: 'TRK-005', title: 'Live at Red Rocks', genre: 'Rock',
      venue: 'Red Rocks Amphitheatre', durationSeconds: 5400, playCount: 120000,
    };
    const rows = getLivePerformanceDetails(data);
    const venueRow = rows.find(r => r.label === 'Venue');
    expect(venueRow?.value).toBe('Red Rocks Amphitheatre');
  });

  it('should show default venue when venue is missing', () => {
    const data = {
      id: 'TRK-006', title: 'Unplugged Session', genre: 'Folk',
      durationSeconds: 3600, playCount: 50000,
    };
    const rows = getLivePerformanceDetails(data);
    const venueRow = rows.find(r => r.label === 'Venue');
    expect(venueRow?.value).toBe('Unknown Venue');
  });
});`,
      },
    ],
    solutionExplanation: `\`LivePerformanceCard.detailRows()\` accesses \`this.data.setlist.map()\` directly. When the data doesn't include a \`setlist\` field, \`this.data.setlist\` is \`undefined\`, and calling \`.map()\` on \`undefined\` throws a TypeError. The fix is to use a fallback: \`(this.data.setlist ?? []).map(...)\`.`,
  },

  // -----------------------------------------------------------------------
  // Bug 11: Sort Comparator Ascending Instead of Descending
  // -----------------------------------------------------------------------
  {
    id: 'music-streamer-11',
    project: 'music-streamer',
    projectLabel: 'Music Streamer',
    bugNumber: 11,
    title: 'Sort Comparator a - b Sorts Ascending Instead of Descending',
    difficulty: 'easy',
    category: 'sort-logic',
    language: 'typescript',
    symptom: `### Symptom

Top tracks and royalty results are sorted with the lowest values first instead of highest first. The least popular track appears at the top of the "Top Tracks" list, and the lowest earner appears first in the royalty results.

### What you know

Both the track catalog and the royalty results components sort their data using JavaScript's \`Array.sort()\` with a comparator function. The results are in the opposite order from what is expected.`,
    hints: [
      'Check the sort comparators in the frontend components.',
      'a.playCount - b.playCount sorts ascending. For descending, use b.playCount - a.playCount.',
      'Both sortTracksByPlayCount and sortRoyaltiesByRevenue use a - b comparators. They should use b - a for highest-first ordering.',
    ],
    files: [
      {
        filename: 'Sorting.ts',
        language: 'typescript',
        buggyCode: `// --- Inline Types ---
interface TrackData {
  id: string;
  title: string;
  playCount: number;
}

interface RoyaltyResult {
  artistId: string;
  artistName: string;
  netRevenue: number;
}

// BUG: Uses a - b (ascending) instead of b - a (descending)
export function sortTracksByPlayCount(tracks: TrackData[]): TrackData[] {
  return [...tracks].sort((a, b) => a.playCount - b.playCount);
}

export function sortRoyaltiesByRevenue(results: RoyaltyResult[]): RoyaltyResult[] {
  return [...results].sort((a, b) => a.netRevenue - b.netRevenue);
}

export function getTopTrack(tracks: TrackData[]): TrackData {
  const sorted = sortTracksByPlayCount(tracks);
  return sorted[0];
}

export function getTopEarner(results: RoyaltyResult[]): RoyaltyResult {
  const sorted = sortRoyaltiesByRevenue(results);
  return sorted[0];
}`,
        solutionCode: `// --- Inline Types ---
interface TrackData {
  id: string;
  title: string;
  playCount: number;
}

interface RoyaltyResult {
  artistId: string;
  artistName: string;
  netRevenue: number;
}

// FIX: Use b - a for descending order (highest first)
export function sortTracksByPlayCount(tracks: TrackData[]): TrackData[] {
  return [...tracks].sort((a, b) => b.playCount - a.playCount);
}

export function sortRoyaltiesByRevenue(results: RoyaltyResult[]): RoyaltyResult[] {
  return [...results].sort((a, b) => b.netRevenue - a.netRevenue);
}

export function getTopTrack(tracks: TrackData[]): TrackData {
  const sorted = sortTracksByPlayCount(tracks);
  return sorted[0];
}

export function getTopEarner(results: RoyaltyResult[]): RoyaltyResult {
  const sorted = sortRoyaltiesByRevenue(results);
  return sorted[0];
}`,
      },
    ],
    testFiles: [
      {
        filename: 'Sorting.test.ts',
        language: 'typescript',
        code: `import { sortTracksByPlayCount, sortRoyaltiesByRevenue, getTopTrack, getTopEarner } from "./Sorting";

describe('Bug 11: Sort Order - Descending', () => {
  const tracks = [
    { id: 'TRK-001', title: 'Midnight Dreams', playCount: 1_500_000 },
    { id: 'TRK-002', title: 'Thunder Road', playCount: 890_000 },
    { id: 'TRK-003', title: 'Code & Coffee', playCount: 45_000 },
    { id: 'TRK-004', title: 'Neon Nights', playCount: 3_200_000 },
  ];

  const royalties = [
    { artistId: 'ART-001', artistName: 'Luna Ray', netRevenue: 94500.00 },
    { artistId: 'ART-002', artistName: 'The Voltage', netRevenue: 25200.00 },
    { artistId: 'ART-003', artistName: 'Dev Talk', netRevenue: 1050.00 },
  ];

  it('should sort tracks with highest play count first', () => {
    const sorted = sortTracksByPlayCount(tracks);
    expect(sorted[0].id).toBe('TRK-004'); // 3.2M plays
    expect(sorted[sorted.length - 1].id).toBe('TRK-003'); // 45K plays
  });

  it('should return the most popular track as top track', () => {
    const top = getTopTrack(tracks);
    expect(top.title).toBe('Neon Nights');
    expect(top.playCount).toBe(3_200_000);
  });

  it('should sort royalties with highest revenue first', () => {
    const sorted = sortRoyaltiesByRevenue(royalties);
    expect(sorted[0].artistName).toBe('Luna Ray');
    expect(sorted[sorted.length - 1].artistName).toBe('Dev Talk');
  });

  it('should return the top earner correctly', () => {
    const top = getTopEarner(royalties);
    expect(top.artistName).toBe('Luna Ray');
    expect(top.netRevenue).toBe(94500.00);
  });

  it('should preserve all items when sorting (no data loss)', () => {
    const sorted = sortTracksByPlayCount(tracks);
    expect(sorted).toHaveLength(tracks.length);
  });
});`,
      },
    ],
    solutionExplanation: `Both \`sortTracksByPlayCount\` and \`sortRoyaltiesByRevenue\` use \`a.value - b.value\` comparators, which sort ascending (smallest first). For a "top tracks" or "top earners" display, the sort should be descending (largest first). The fix is to change the comparators to \`b.value - a.value\`.`,
  },

  // -----------------------------------------------------------------------
  // Bug 12: Test Validates Buggy Behavior (Months vs Minutes)
  // -----------------------------------------------------------------------
  {
    id: 'music-streamer-12',
    project: 'music-streamer',
    projectLabel: 'Music Streamer',
    bugNumber: 12,
    title: 'Test Asserts Months Instead of Minutes (Validates Bug 4)',
    difficulty: 'medium',
    category: 'misleading-test',
    language: 'typescript',
    symptom: `### Symptom

The playlist duration test passes, but it expects the end time to be 10 months away for a 10-minute playlist. The test was written to match buggy code, creating a false positive.

### What you know

The \`CuratedPlaylist\` code has been fixed (it correctly uses \`setMinutes\`), but the test function still checks the month difference instead of the minute difference. The test reports "endTimeCorrect: false" even though the code is correct.

The bug is **in the test logic**, not in the playlist code.`,
    hints: [
      'Read the test assertion carefully. Does diffMonths === 10 make sense for a 10-minute playlist?',
      'The test is for CuratedPlaylist duration. It expects the end time to be 10 months from now. That\'s the Bug 4 behavior -- the test was written to match the broken code.',
      'After fixing Bug 4, this test will fail. Update it to check that the end time is ~10 minutes from now instead of 10 months.',
    ],
    files: [
      {
        filename: 'PlaylistDurationTest.ts',
        language: 'typescript',
        buggyCode: `// --- Inline Types ---
interface PlaylistDurationResult {
  playlistId: string;
  playlistName: string;
  totalMinutes: number;
  estimatedEndTime: string;
}

interface PlaylistData {
  id: string;
  name: string;
  totalDurationSeconds: number;
}

class Playlist {
  public readonly id: string;
  public readonly name: string;
  public readonly totalDurationSeconds: number;

  constructor(data: PlaylistData) {
    this.id = data.id;
    this.name = data.name;
    this.totalDurationSeconds = data.totalDurationSeconds;
  }

  public calculateDuration(): PlaylistDurationResult {
    const totalMinutes = Math.ceil(this.totalDurationSeconds / 60);
    const estimatedEndTime = this.estimateEndTime(totalMinutes);
    return {
      playlistId: this.id,
      playlistName: this.name,
      totalMinutes,
      estimatedEndTime: estimatedEndTime.toISOString(),
    };
  }

  protected estimateEndTime(totalMinutes: number): Date {
    const now = new Date();
    now.setMinutes(now.getMinutes() + totalMinutes);
    return now;
  }
}

class CuratedPlaylist extends Playlist {
  protected override estimateEndTime(totalMinutes: number): Date {
    const now = new Date();
    // This is the FIXED implementation (Bug 4 is already fixed)
    now.setMinutes(now.getMinutes() + totalMinutes);
    return now;
  }
}

// BUG: The test function validates months instead of minutes
export function runPlaylistDurationTest(): { totalMinutesCorrect: boolean; endTimeCorrect: boolean } {
  const playlist = new CuratedPlaylist({
    id: 'PL-TEST', name: 'Test Playlist', totalDurationSeconds: 600,
  });
  const result = playlist.calculateDuration();

  const totalMinutesCorrect = result.totalMinutes === 10;

  // BUG: Checking months difference instead of minutes difference
  const endTime = new Date(result.estimatedEndTime);
  const now = new Date();
  const diffMonths = endTime.getMonth() - now.getMonth();
  const endTimeCorrect = diffMonths === 10; // This would pass with setMonth bug, fail with correct code

  return { totalMinutesCorrect, endTimeCorrect };
}`,
        solutionCode: `// --- Inline Types ---
interface PlaylistDurationResult {
  playlistId: string;
  playlistName: string;
  totalMinutes: number;
  estimatedEndTime: string;
}

interface PlaylistData {
  id: string;
  name: string;
  totalDurationSeconds: number;
}

class Playlist {
  public readonly id: string;
  public readonly name: string;
  public readonly totalDurationSeconds: number;

  constructor(data: PlaylistData) {
    this.id = data.id;
    this.name = data.name;
    this.totalDurationSeconds = data.totalDurationSeconds;
  }

  public calculateDuration(): PlaylistDurationResult {
    const totalMinutes = Math.ceil(this.totalDurationSeconds / 60);
    const estimatedEndTime = this.estimateEndTime(totalMinutes);
    return {
      playlistId: this.id,
      playlistName: this.name,
      totalMinutes,
      estimatedEndTime: estimatedEndTime.toISOString(),
    };
  }

  protected estimateEndTime(totalMinutes: number): Date {
    const now = new Date();
    now.setMinutes(now.getMinutes() + totalMinutes);
    return now;
  }
}

class CuratedPlaylist extends Playlist {
  protected override estimateEndTime(totalMinutes: number): Date {
    const now = new Date();
    now.setMinutes(now.getMinutes() + totalMinutes);
    return now;
  }
}

// FIX: Validate minutes difference, not months difference
export function runPlaylistDurationTest(): { totalMinutesCorrect: boolean; endTimeCorrect: boolean } {
  const playlist = new CuratedPlaylist({
    id: 'PL-TEST', name: 'Test Playlist', totalDurationSeconds: 600,
  });
  const result = playlist.calculateDuration();

  const totalMinutesCorrect = result.totalMinutes === 10;

  // FIX: Check minutes difference using milliseconds, not month comparison
  const endTime = new Date(result.estimatedEndTime);
  const now = new Date();
  const diffMinutes = Math.round((endTime.getTime() - now.getTime()) / (1000 * 60));
  const endTimeCorrect = diffMinutes >= 9 && diffMinutes <= 11;

  return { totalMinutesCorrect, endTimeCorrect };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'PlaylistDurationTest.test.ts',
        language: 'typescript',
        code: `import { runPlaylistDurationTest } from "./PlaylistDurationTest";

describe('Bug 12: Playlist Duration Test Validates Correct Behavior', () => {
  it('should report totalMinutes as correct', () => {
    const result = runPlaylistDurationTest();
    expect(result.totalMinutesCorrect).toBe(true);
  });

  it('should report endTime as correct (within ~10 minutes, not months)', () => {
    const result = runPlaylistDurationTest();
    expect(result.endTimeCorrect).toBe(true);
  });

  it('should validate both fields pass together', () => {
    const result = runPlaylistDurationTest();
    expect(result.totalMinutesCorrect).toBe(true);
    expect(result.endTimeCorrect).toBe(true);
  });

  it('endTimeCorrect should not pass by comparing months', () => {
    // If the bug is present (comparing months), endTimeCorrect would be false
    // because the code correctly uses setMinutes, producing a ~0 month difference
    const result = runPlaylistDurationTest();
    expect(result.endTimeCorrect).toBe(true);
  });
});`,
      },
    ],
    solutionExplanation: `The test asserts that the difference between the end time and now is 10 months (\`diffMonths === 10\`), matching Bug 4's broken \`setMonth\` behavior. This is a false positive -- the test passes only when the code is buggy. With the correct \`setMinutes\` implementation, the month difference is 0 (not 10), so the test fails. The fix is to assert that the end time is approximately 10 minutes from now using millisecond-based comparison instead of month comparison.`,
  },
];
