// Fetches peer dependencies from unpkg at build time

const PACKAGES = [
	'angular-three',
	'angular-three-soba',
	'angular-three-rapier',
	'angular-three-cannon',
	'angular-three-postprocessing',
	'angular-three-theatre',
	'angular-three-tweakpane',
] as const;

export type PackageName = (typeof PACKAGES)[number];

export interface PackageInfo {
	name: PackageName;
	version: string;
	peerDependencies: Record<string, string>;
}

const cache = new Map<PackageName, PackageInfo>();

async function fetchPackageJson(packageName: PackageName): Promise<PackageInfo> {
	if (cache.has(packageName)) {
		return cache.get(packageName)!;
	}

	try {
		const response = await fetch(`https://unpkg.com/${packageName}/package.json`);
		if (!response.ok) {
			throw new Error(`Failed to fetch ${packageName}: ${response.statusText}`);
		}

		const json = await response.json();
		const info: PackageInfo = {
			name: packageName,
			version: json.version,
			peerDependencies: json.peerDependencies || {},
		};

		cache.set(packageName, info);
		return info;
	} catch (error) {
		console.error(`Error fetching ${packageName}:`, error);
		return {
			name: packageName,
			version: 'unknown',
			peerDependencies: {},
		};
	}
}

export async function getPackageInfo(packageName: PackageName): Promise<PackageInfo> {
	return fetchPackageJson(packageName);
}

export async function getAllPackagesInfo(): Promise<PackageInfo[]> {
	return Promise.all(PACKAGES.map(fetchPackageJson));
}

export { PACKAGES };
