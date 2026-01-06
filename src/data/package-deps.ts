// Fetches compatibility matrix from angular-three-plugin at build time

export interface CombinedEntry {
	angularThree: string;
	three: string;
	angular: string;
	ngxtension: string;
}

export interface PackageEntry {
	version: string;
	peerDependencies: Record<string, string>;
}

export interface PackageInfo {
	displayName: string;
	entries: PackageEntry[];
}

export interface CompatMatrix {
	updatedAt: string;
	combined: CombinedEntry[];
	packages: Record<string, PackageInfo>;
}

let cachedMatrix: CompatMatrix | null = null;

export async function getCompatMatrix(): Promise<CompatMatrix> {
	if (cachedMatrix) {
		return cachedMatrix;
	}

	try {
		const response = await fetch('https://unpkg.com/angular-three-plugin@latest/compat-matrix.json');
		if (!response.ok) {
			throw new Error(`Failed to fetch compat matrix: ${response.statusText}`);
		}

		cachedMatrix = await response.json();
		return cachedMatrix!;
	} catch (error) {
		console.error('Error fetching compat matrix:', error);
		return {
			updatedAt: new Date().toISOString(),
			combined: [],
			packages: {},
		};
	}
}

export async function getPackagePeerDeps(packageName: string): Promise<PackageEntry[]> {
	const matrix = await getCompatMatrix();
	return matrix.packages[packageName]?.entries || [];
}

export async function getCombinedMatrix(): Promise<CombinedEntry[]> {
	const matrix = await getCompatMatrix();
	return matrix.combined;
}
