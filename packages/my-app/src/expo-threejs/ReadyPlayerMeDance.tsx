import { WebView, WebViewProps } from 'react-native-webview';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';
import { MyText } from 'react-native-my-text';
import { Asset } from 'expo-asset';

export type ReadyPlayerMeDanceProps = Omit<
  WebViewProps,
  'source' | 'originWhiteList'
> & {
  fbxAnimationUri?: string;
  animationResource?: number;
  /**
   * If true, then the local URI will be used rather than the remote one, defaults to false.
   * Local URIs do not appear to work in WebView
   */
  useLocalUri?: boolean;
  modelUri?: string;
  avatarId?: string;
};

const fetchCachedFile = async (sourceUri: string): Promise<string> => {
  if (sourceUri.startsWith('file:///')) {
    return sourceUri;
  }
  const filename = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    JSON.stringify(sourceUri),
  );
  const cachedFileUri = `${FileSystem.cacheDirectory}${filename}`;
  const download = await FileSystem.downloadAsync(sourceUri, cachedFileUri, {
    cache: true,
  });
  if (download.status === 200) {
    return download.uri;
  } else {
    throw new Error(`unexpected HTTP status: ${download.status}`);
  }
};
const buildDataUri = async (
  sourceUri: string,
  mimeType: string,
): Promise<string> => {
  const cachedFileUri = await fetchCachedFile(sourceUri);
  const base64Data = await FileSystem.readAsStringAsync(cachedFileUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return `data:${mimeType};base64,${base64Data}`;
};

/**
 * This component is for
 */
export const ReadyPlayerMeDance: FC<ReadyPlayerMeDanceProps> = ({
  fbxAnimationUri,
  animationResource,
  useLocalUri,
  modelUri,
  avatarId,
  ...avatarInfoProps
}) => {
  const [modelLocalUri, setModelLocalUri] = useState<string | null>(null);
  const [animationLocalUri, setAnimationLocalUri] = useState<string | null>(
    null,
  );
  const [animationLocalFileUri, setAnimationLocalFileUri] = useState<
    string | null
  >(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!animationResource) {
        return;
      }
      const [download] = await Asset.loadAsync(animationResource);
      if (mounted) {
        setAnimationLocalFileUri(download.localUri);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [animationResource]);
  const remoteModelUri = useMemo(() => {
    if (modelUri) {
      return modelUri;
    } else {
      return `https://models.readyplayer.me/${avatarId}.glb`;
    }
  }, [modelUri, avatarId]);

  const remoteAnimationUri = useMemo<string | null>(() => {
    if (fbxAnimationUri) {
      return fbxAnimationUri;
    } else {
      return animationLocalFileUri;
    }
  }, [fbxAnimationUri, animationLocalFileUri]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!useLocalUri || !remoteAnimationUri) {
        return;
      }
      const [modelDataUri, animationDataUri] = await Promise.all([
        buildDataUri(remoteModelUri, 'model/gtlf-binary'),
        buildDataUri(remoteAnimationUri, 'model/vnd.fbx'),
      ]);
      if (mounted) {
        setModelLocalUri(modelDataUri);
        setAnimationLocalUri(animationDataUri);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [remoteModelUri, fbxAnimationUri, useLocalUri, remoteAnimationUri]);

  const finalModelUri = useMemo(
    () => (useLocalUri ? modelLocalUri : remoteModelUri),
    [useLocalUri, modelLocalUri, remoteModelUri],
  );
  const animationUri = useMemo(
    () => (useLocalUri ? animationLocalUri : fbxAnimationUri),
    [useLocalUri, animationLocalUri, fbxAnimationUri],
  );
  const webviewRef = useRef<WebView>(null);
  if (finalModelUri === null || animationUri === null) {
    return (
      <MyText style={{ color: 'red', fontSize: 20 }}>
        Loading {remoteModelUri} and {fbxAnimationUri}...
      </MyText>
    );
  }
  return (
    <WebView
      {...avatarInfoProps}
      originWhitelist={['*']}
      onContentProcessDidTerminate={() => webviewRef.current?.reload()}
      ref={webviewRef}
      source={{
        html: `
<html lang="en">
	<head>
		<title>three.js webgpu - animation retargeting</title>
		<meta charSet="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<link type="text/css" rel="stylesheet" href="main.css">
	</head>
	<body>

		<script type="importmap">
			{
				"imports": {
					"three": "../build/three.webgpu.js",
					"three/tsl": "../build/three.webgpu.js",
					"three/addons/": "./jsm/"
				}
			}
		</script>

		<script type="module">

			import * as THREE from 'three';
			import { screenUV, color, vec2, vec4, reflector, positionWorld } from 'three/tsl';

			import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
			import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
			import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

			import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

			const [ sourceModel, targetModel ] = await Promise.all( [

				new Promise( ( resolve, reject ) => {

					new FBXLoader().load( ${JSON.stringify(animationUri)}, resolve, undefined, reject );

				} ),

				new Promise( ( resolve, reject ) => {
					new GLTFLoader().load( ${JSON.stringify(finalModelUri)}, resolve, undefined, reject );
				} )

			] );

			//

			const clock = new THREE.Clock();

			// scene

			const scene = new THREE.Scene();

			// background

			const horizontalEffect = screenUV.x.mix( color( 0x13172b ), color( 0x311649 ) );
			const lightEffect = screenUV.distance( vec2( 0.5, 1.0 ) ).oneMinus().mul( color( 0x0c5d68 ) );

			scene.backgroundNode = horizontalEffect.add( lightEffect );

			//

			const light = new THREE.HemisphereLight( 0x311649, 0x0c5d68, 10 );
			scene.add( light );

			const backLight = new THREE.DirectionalLight( 0xffffff, 10 );
			backLight.position.set( 0, 5, - 5 );
			scene.add( backLight );

			const keyLight = new THREE.DirectionalLight( 0xfff9ea, 4 );
			keyLight.position.set( 3, 5, 3 );
			scene.add( keyLight );

			const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, .25, 50 );
			camera.position.set( 0, 3, 5 );

			// add models to scene
			scene.add( sourceModel );
			scene.add( targetModel.scene );

			// reposition models
			sourceModel.position.x -= .9;
			targetModel.scene.position.x += .9;

			// reajust model - mixamo use centimeters, readyplayer.me use meters (three.js scale is meters)
			sourceModel.scale.setScalar( .01 );

			// retarget
			const source = getSource( sourceModel );
			const mixer = retargetModel( source, targetModel );

			// renderer
			const renderer = new THREE.WebGPURenderer( { antialias: true } );
			renderer.toneMapping = THREE.NeutralToneMapping;
			renderer.setAnimationLoop( animate );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			const controls = new OrbitControls( camera, renderer.domElement );
			controls.minDistance = 3;
			controls.maxDistance = 12;
			controls.target.set( 0, 1, 0 );
			controls.maxPolarAngle = Math.PI / 2;

			// floor
			const reflection = reflector();
			reflection.target.rotateX( - Math.PI / 2 );
			scene.add( reflection.target );

			const reflectionMask = positionWorld.xz.distance( 0 ).mul( .1 ).clamp().oneMinus();

			const floorMaterial = new THREE.NodeMaterial();
			floorMaterial.colorNode = vec4( reflection.rgb, reflectionMask );
			floorMaterial.opacity = .2;
			floorMaterial.transparent = true;

			const floor = new THREE.Mesh( new THREE.BoxGeometry( 50, .001, 50 ), floorMaterial );
			floor.receiveShadow = true;

			floor.position.set( 0, 0, 0 );
			scene.add( floor );

			//

			function getSource( sourceModel ) {

				const clip = sourceModel.animations[ 0 ]

				const helper = new THREE.SkeletonHelper( sourceModel );
				const skeleton = new THREE.Skeleton( helper.bones );

				const mixer = new THREE.AnimationMixer( sourceModel );
				mixer.clipAction( sourceModel.animations[ 0 ] ).play();

				return { clip, skeleton, mixer };

			}

			function retargetModel( sourceModel, targetModel ) {

				const targetSkin = targetModel.scene.children[ 0 ].children[ 1 ];

				const retargetOptions = {

					// specify the name of the source's hip bone.
					hip: 'mixamorigHips',

					// preserve the scale of the target model
					scale: .01,

					// use ( 0, 1, 0 ) to ignore xz hip movement.
					//hipInfluence: new THREE.Vector3( 0, 1, 0 ),

					// Map of target's bone names to source's bone names -> { targetBoneName: sourceBoneName }
					getBoneName: function ( bone ) {

						return 'mixamorig' + bone.name;

					}

				};

				const retargetedClip = SkeletonUtils.retargetClip( targetSkin, sourceModel.skeleton, sourceModel.clip, retargetOptions );

				const mixer = new THREE.AnimationMixer( targetSkin );
				mixer.clipAction( retargetedClip ).play();

				return mixer;

			}

			window.onresize = function () {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			};

			function animate() {

				const delta = clock.getDelta();

				source.mixer.update( delta );
				mixer.update( delta );

				controls.update();

				renderer.render( scene, camera );

			}

		</script>
	</body>
</html>
`,
        baseUrl: 'https://threejs.org/examples/',
      }}
    />
  );
};
