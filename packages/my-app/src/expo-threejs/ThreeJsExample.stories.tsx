import type { Meta, StoryObj } from '@storybook/react';
import { ThreeJsExample } from './ThreeJsExample';
import { PreviewViewMode } from '@sb/preview';

const meta: Meta<typeof ThreeJsExample> = {
  title: 'three.js Examples',
  component: ThreeJsExample,
  parameters: {
    notes: 'Examples from three.js',
  },
};

export default meta;

type Story = StoryObj<typeof ThreeJsExample>;

export const WebglAnimationKeyframes: Story = {
  args: {
    exampleName: 'webgl_animation_keyframes',
  },
  storyName: 'webgl webgl_animation_keyframes',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglAnimationSkinningBlending: Story = {
  args: {
    exampleName: 'webgl_animation_skinning_blending',
  },
  storyName: 'webgl webgl_animation_skinning_blending',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglAnimationSkinningAdditiveBlending: Story = {
  args: {
    exampleName: 'webgl_animation_skinning_additive_blending',
  },
  storyName: 'webgl webgl_animation_skinning_additive_blending',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglAnimationSkinningIk: Story = {
  args: {
    exampleName: 'webgl_animation_skinning_ik',
  },
  storyName: 'webgl webgl_animation_skinning_ik',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglAnimationSkinningMorph: Story = {
  args: {
    exampleName: 'webgl_animation_skinning_morph',
  },
  storyName: 'webgl webgl_animation_skinning_morph',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglAnimationMultiple: Story = {
  args: {
    exampleName: 'webgl_animation_multiple',
  },
  storyName: 'webgl webgl_animation_multiple',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglCamera: Story = {
  args: {
    exampleName: 'webgl_camera',
  },
  storyName: 'webgl webgl_camera',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglCameraArray: Story = {
  args: {
    exampleName: 'webgl_camera_array',
  },
  storyName: 'webgl webgl_camera_array',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglCameraLogarithmicdepthbuffer: Story = {
  args: {
    exampleName: 'webgl_camera_logarithmicdepthbuffer',
  },
  storyName: 'webgl webgl_camera_logarithmicdepthbuffer',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglClipping: Story = {
  args: {
    exampleName: 'webgl_clipping',
  },
  storyName: 'webgl webgl_clipping',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglClippingAdvanced: Story = {
  args: {
    exampleName: 'webgl_clipping_advanced',
  },
  storyName: 'webgl webgl_clipping_advanced',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglClippingIntersection: Story = {
  args: {
    exampleName: 'webgl_clipping_intersection',
  },
  storyName: 'webgl webgl_clipping_intersection',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglClippingStencil: Story = {
  args: {
    exampleName: 'webgl_clipping_stencil',
  },
  storyName: 'webgl webgl_clipping_stencil',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglDecals: Story = {
  args: {
    exampleName: 'webgl_decals',
  },
  storyName: 'webgl webgl_decals',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglDepthTexture: Story = {
  args: {
    exampleName: 'webgl_depth_texture',
  },
  storyName: 'webgl webgl_depth_texture',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglEffectsAnaglyph: Story = {
  args: {
    exampleName: 'webgl_effects_anaglyph',
  },
  storyName: 'webgl webgl_effects_anaglyph',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglEffectsAscii: Story = {
  args: {
    exampleName: 'webgl_effects_ascii',
  },
  storyName: 'webgl webgl_effects_ascii',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglEffectsParallaxbarrier: Story = {
  args: {
    exampleName: 'webgl_effects_parallaxbarrier',
  },
  storyName: 'webgl webgl_effects_parallaxbarrier',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglEffectsPeppersghost: Story = {
  args: {
    exampleName: 'webgl_effects_peppersghost',
  },
  storyName: 'webgl webgl_effects_peppersghost',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglEffectsStereo: Story = {
  args: {
    exampleName: 'webgl_effects_stereo',
  },
  storyName: 'webgl webgl_effects_stereo',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglFramebufferTexture: Story = {
  args: {
    exampleName: 'webgl_framebuffer_texture',
  },
  storyName: 'webgl webgl_framebuffer_texture',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometries: Story = {
  args: {
    exampleName: 'webgl_geometries',
  },
  storyName: 'webgl webgl_geometries',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometriesParametric: Story = {
  args: {
    exampleName: 'webgl_geometries_parametric',
  },
  storyName: 'webgl webgl_geometries_parametric',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometryColors: Story = {
  args: {
    exampleName: 'webgl_geometry_colors',
  },
  storyName: 'webgl webgl_geometry_colors',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometryColorsLookuptable: Story = {
  args: {
    exampleName: 'webgl_geometry_colors_lookuptable',
  },
  storyName: 'webgl webgl_geometry_colors_lookuptable',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometryConvex: Story = {
  args: {
    exampleName: 'webgl_geometry_convex',
  },
  storyName: 'webgl webgl_geometry_convex',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometryCsg: Story = {
  args: {
    exampleName: 'webgl_geometry_csg',
  },
  storyName: 'webgl webgl_geometry_csg',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometryCube: Story = {
  args: {
    exampleName: 'webgl_geometry_cube',
  },
  storyName: 'webgl webgl_geometry_cube',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometryDynamic: Story = {
  args: {
    exampleName: 'webgl_geometry_dynamic',
  },
  storyName: 'webgl webgl_geometry_dynamic',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometryExtrudeShapes: Story = {
  args: {
    exampleName: 'webgl_geometry_extrude_shapes',
  },
  storyName: 'webgl webgl_geometry_extrude_shapes',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometryExtrudeSplines: Story = {
  args: {
    exampleName: 'webgl_geometry_extrude_splines',
  },
  storyName: 'webgl webgl_geometry_extrude_splines',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometryMinecraft: Story = {
  args: {
    exampleName: 'webgl_geometry_minecraft',
  },
  storyName: 'webgl webgl_geometry_minecraft',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometryNurbs: Story = {
  args: {
    exampleName: 'webgl_geometry_nurbs',
  },
  storyName: 'webgl webgl_geometry_nurbs',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometryShapes: Story = {
  args: {
    exampleName: 'webgl_geometry_shapes',
  },
  storyName: 'webgl webgl_geometry_shapes',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometrySplineEditor: Story = {
  args: {
    exampleName: 'webgl_geometry_spline_editor',
  },
  storyName: 'webgl webgl_geometry_spline_editor',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometryTeapot: Story = {
  args: {
    exampleName: 'webgl_geometry_teapot',
  },
  storyName: 'webgl webgl_geometry_teapot',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometryTerrain: Story = {
  args: {
    exampleName: 'webgl_geometry_terrain',
  },
  storyName: 'webgl webgl_geometry_terrain',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometryTerrainRaycast: Story = {
  args: {
    exampleName: 'webgl_geometry_terrain_raycast',
  },
  storyName: 'webgl webgl_geometry_terrain_raycast',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometryText: Story = {
  args: {
    exampleName: 'webgl_geometry_text',
  },
  storyName: 'webgl webgl_geometry_text',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometryTextShapes: Story = {
  args: {
    exampleName: 'webgl_geometry_text_shapes',
  },
  storyName: 'webgl webgl_geometry_text_shapes',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGeometryTextStroke: Story = {
  args: {
    exampleName: 'webgl_geometry_text_stroke',
  },
  storyName: 'webgl webgl_geometry_text_stroke',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglHelpers: Story = {
  args: {
    exampleName: 'webgl_helpers',
  },
  storyName: 'webgl webgl_helpers',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglInstancingMorph: Story = {
  args: {
    exampleName: 'webgl_instancing_morph',
  },
  storyName: 'webgl webgl_instancing_morph',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglInstancingDynamic: Story = {
  args: {
    exampleName: 'webgl_instancing_dynamic',
  },
  storyName: 'webgl webgl_instancing_dynamic',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglInstancingPerformance: Story = {
  args: {
    exampleName: 'webgl_instancing_performance',
  },
  storyName: 'webgl webgl_instancing_performance',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglInstancingRaycast: Story = {
  args: {
    exampleName: 'webgl_instancing_raycast',
  },
  storyName: 'webgl webgl_instancing_raycast',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglInstancingScatter: Story = {
  args: {
    exampleName: 'webgl_instancing_scatter',
  },
  storyName: 'webgl webgl_instancing_scatter',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglInteractiveBuffergeometry: Story = {
  args: {
    exampleName: 'webgl_interactive_buffergeometry',
  },
  storyName: 'webgl webgl_interactive_buffergeometry',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglInteractiveCubes: Story = {
  args: {
    exampleName: 'webgl_interactive_cubes',
  },
  storyName: 'webgl webgl_interactive_cubes',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglInteractiveCubesGpu: Story = {
  args: {
    exampleName: 'webgl_interactive_cubes_gpu',
  },
  storyName: 'webgl webgl_interactive_cubes_gpu',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglInteractiveCubesOrtho: Story = {
  args: {
    exampleName: 'webgl_interactive_cubes_ortho',
  },
  storyName: 'webgl webgl_interactive_cubes_ortho',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglInteractiveLines: Story = {
  args: {
    exampleName: 'webgl_interactive_lines',
  },
  storyName: 'webgl webgl_interactive_lines',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglInteractivePoints: Story = {
  args: {
    exampleName: 'webgl_interactive_points',
  },
  storyName: 'webgl webgl_interactive_points',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglInteractiveRaycastingPoints: Story = {
  args: {
    exampleName: 'webgl_interactive_raycasting_points',
  },
  storyName: 'webgl webgl_interactive_raycasting_points',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglInteractiveVoxelpainter: Story = {
  args: {
    exampleName: 'webgl_interactive_voxelpainter',
  },
  storyName: 'webgl webgl_interactive_voxelpainter',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLayers: Story = {
  args: {
    exampleName: 'webgl_layers',
  },
  storyName: 'webgl webgl_layers',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLensflares: Story = {
  args: {
    exampleName: 'webgl_lensflares',
  },
  storyName: 'webgl webgl_lensflares',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLightprobe: Story = {
  args: {
    exampleName: 'webgl_lightprobe',
  },
  storyName: 'webgl webgl_lightprobe',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLightprobeCubecamera: Story = {
  args: {
    exampleName: 'webgl_lightprobe_cubecamera',
  },
  storyName: 'webgl webgl_lightprobe_cubecamera',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLightsHemisphere: Story = {
  args: {
    exampleName: 'webgl_lights_hemisphere',
  },
  storyName: 'webgl webgl_lights_hemisphere',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLightsPhysical: Story = {
  args: {
    exampleName: 'webgl_lights_physical',
  },
  storyName: 'webgl webgl_lights_physical',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLightsPointlights: Story = {
  args: {
    exampleName: 'webgl_lights_pointlights',
  },
  storyName: 'webgl webgl_lights_pointlights',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLightsSpotlight: Story = {
  args: {
    exampleName: 'webgl_lights_spotlight',
  },
  storyName: 'webgl webgl_lights_spotlight',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLightsSpotlights: Story = {
  args: {
    exampleName: 'webgl_lights_spotlights',
  },
  storyName: 'webgl webgl_lights_spotlights',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLightsRectarealight: Story = {
  args: {
    exampleName: 'webgl_lights_rectarealight',
  },
  storyName: 'webgl webgl_lights_rectarealight',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLinesColors: Story = {
  args: {
    exampleName: 'webgl_lines_colors',
  },
  storyName: 'webgl webgl_lines_colors',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLinesDashed: Story = {
  args: {
    exampleName: 'webgl_lines_dashed',
  },
  storyName: 'webgl webgl_lines_dashed',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLinesFat: Story = {
  args: {
    exampleName: 'webgl_lines_fat',
  },
  storyName: 'webgl webgl_lines_fat',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLinesFatRaycasting: Story = {
  args: {
    exampleName: 'webgl_lines_fat_raycasting',
  },
  storyName: 'webgl webgl_lines_fat_raycasting',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLinesFatWireframe: Story = {
  args: {
    exampleName: 'webgl_lines_fat_wireframe',
  },
  storyName: 'webgl webgl_lines_fat_wireframe',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoader3Dm: Story = {
  args: {
    exampleName: 'webgl_loader_3dm',
  },
  storyName: 'webgl webgl_loader_3dm',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoader3Ds: Story = {
  args: {
    exampleName: 'webgl_loader_3ds',
  },
  storyName: 'webgl webgl_loader_3ds',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoader3Mf: Story = {
  args: {
    exampleName: 'webgl_loader_3mf',
  },
  storyName: 'webgl webgl_loader_3mf',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoader3MfMaterials: Story = {
  args: {
    exampleName: 'webgl_loader_3mf_materials',
  },
  storyName: 'webgl webgl_loader_3mf_materials',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderAmf: Story = {
  args: {
    exampleName: 'webgl_loader_amf',
  },
  storyName: 'webgl webgl_loader_amf',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderBvh: Story = {
  args: {
    exampleName: 'webgl_loader_bvh',
  },
  storyName: 'webgl webgl_loader_bvh',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderCollada: Story = {
  args: {
    exampleName: 'webgl_loader_collada',
  },
  storyName: 'webgl webgl_loader_collada',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderColladaKinematics: Story = {
  args: {
    exampleName: 'webgl_loader_collada_kinematics',
  },
  storyName: 'webgl webgl_loader_collada_kinematics',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderColladaSkinning: Story = {
  args: {
    exampleName: 'webgl_loader_collada_skinning',
  },
  storyName: 'webgl webgl_loader_collada_skinning',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderDraco: Story = {
  args: {
    exampleName: 'webgl_loader_draco',
  },
  storyName: 'webgl webgl_loader_draco',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderFbx: Story = {
  args: {
    exampleName: 'webgl_loader_fbx',
  },
  storyName: 'webgl webgl_loader_fbx',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderFbxNurbs: Story = {
  args: {
    exampleName: 'webgl_loader_fbx_nurbs',
  },
  storyName: 'webgl webgl_loader_fbx_nurbs',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderGcode: Story = {
  args: {
    exampleName: 'webgl_loader_gcode',
  },
  storyName: 'webgl webgl_loader_gcode',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderGltf: Story = {
  args: {
    exampleName: 'webgl_loader_gltf',
  },
  storyName: 'webgl webgl_loader_gltf',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderGltfAvif: Story = {
  args: {
    exampleName: 'webgl_loader_gltf_avif',
  },
  storyName: 'webgl webgl_loader_gltf_avif',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderGltfCompressed: Story = {
  args: {
    exampleName: 'webgl_loader_gltf_compressed',
  },
  storyName: 'webgl webgl_loader_gltf_compressed',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderGltfDispersion: Story = {
  args: {
    exampleName: 'webgl_loader_gltf_dispersion',
  },
  storyName: 'webgl webgl_loader_gltf_dispersion',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderGltfInstancing: Story = {
  args: {
    exampleName: 'webgl_loader_gltf_instancing',
  },
  storyName: 'webgl webgl_loader_gltf_instancing',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderGltfIridescence: Story = {
  args: {
    exampleName: 'webgl_loader_gltf_iridescence',
  },
  storyName: 'webgl webgl_loader_gltf_iridescence',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderGltfSheen: Story = {
  args: {
    exampleName: 'webgl_loader_gltf_sheen',
  },
  storyName: 'webgl webgl_loader_gltf_sheen',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderGltfTransmission: Story = {
  args: {
    exampleName: 'webgl_loader_gltf_transmission',
  },
  storyName: 'webgl webgl_loader_gltf_transmission',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderGltfVariants: Story = {
  args: {
    exampleName: 'webgl_loader_gltf_variants',
  },
  storyName: 'webgl webgl_loader_gltf_variants',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderGltfAnisotropy: Story = {
  args: {
    exampleName: 'webgl_loader_gltf_anisotropy',
  },
  storyName: 'webgl webgl_loader_gltf_anisotropy',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderIfc: Story = {
  args: {
    exampleName: 'webgl_loader_ifc',
  },
  storyName: 'webgl webgl_loader_ifc',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderImagebitmap: Story = {
  args: {
    exampleName: 'webgl_loader_imagebitmap',
  },
  storyName: 'webgl webgl_loader_imagebitmap',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderKmz: Story = {
  args: {
    exampleName: 'webgl_loader_kmz',
  },
  storyName: 'webgl webgl_loader_kmz',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderLdraw: Story = {
  args: {
    exampleName: 'webgl_loader_ldraw',
  },
  storyName: 'webgl webgl_loader_ldraw',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderLwo: Story = {
  args: {
    exampleName: 'webgl_loader_lwo',
  },
  storyName: 'webgl webgl_loader_lwo',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderMd2: Story = {
  args: {
    exampleName: 'webgl_loader_md2',
  },
  storyName: 'webgl webgl_loader_md2',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderMd2Control: Story = {
  args: {
    exampleName: 'webgl_loader_md2_control',
  },
  storyName: 'webgl webgl_loader_md2_control',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderMdd: Story = {
  args: {
    exampleName: 'webgl_loader_mdd',
  },
  storyName: 'webgl webgl_loader_mdd',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderMmd: Story = {
  args: {
    exampleName: 'webgl_loader_mmd',
  },
  storyName: 'webgl webgl_loader_mmd',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderMmdPose: Story = {
  args: {
    exampleName: 'webgl_loader_mmd_pose',
  },
  storyName: 'webgl webgl_loader_mmd_pose',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderMmdAudio: Story = {
  args: {
    exampleName: 'webgl_loader_mmd_audio',
  },
  storyName: 'webgl webgl_loader_mmd_audio',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderNrrd: Story = {
  args: {
    exampleName: 'webgl_loader_nrrd',
  },
  storyName: 'webgl webgl_loader_nrrd',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderObj: Story = {
  args: {
    exampleName: 'webgl_loader_obj',
  },
  storyName: 'webgl webgl_loader_obj',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderObjMtl: Story = {
  args: {
    exampleName: 'webgl_loader_obj_mtl',
  },
  storyName: 'webgl webgl_loader_obj_mtl',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderPcd: Story = {
  args: {
    exampleName: 'webgl_loader_pcd',
  },
  storyName: 'webgl webgl_loader_pcd',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderPdb: Story = {
  args: {
    exampleName: 'webgl_loader_pdb',
  },
  storyName: 'webgl webgl_loader_pdb',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderPly: Story = {
  args: {
    exampleName: 'webgl_loader_ply',
  },
  storyName: 'webgl webgl_loader_ply',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderStl: Story = {
  args: {
    exampleName: 'webgl_loader_stl',
  },
  storyName: 'webgl webgl_loader_stl',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderSvg: Story = {
  args: {
    exampleName: 'webgl_loader_svg',
  },
  storyName: 'webgl webgl_loader_svg',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderTextureDds: Story = {
  args: {
    exampleName: 'webgl_loader_texture_dds',
  },
  storyName: 'webgl webgl_loader_texture_dds',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderTextureExr: Story = {
  args: {
    exampleName: 'webgl_loader_texture_exr',
  },
  storyName: 'webgl webgl_loader_texture_exr',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderTextureUltrahdr: Story = {
  args: {
    exampleName: 'webgl_loader_texture_ultrahdr',
  },
  storyName: 'webgl webgl_loader_texture_ultrahdr',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderTextureHdr: Story = {
  args: {
    exampleName: 'webgl_loader_texture_hdr',
  },
  storyName: 'webgl webgl_loader_texture_hdr',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderTextureKtx: Story = {
  args: {
    exampleName: 'webgl_loader_texture_ktx',
  },
  storyName: 'webgl webgl_loader_texture_ktx',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderTextureKtx2: Story = {
  args: {
    exampleName: 'webgl_loader_texture_ktx2',
  },
  storyName: 'webgl webgl_loader_texture_ktx2',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderTextureLottie: Story = {
  args: {
    exampleName: 'webgl_loader_texture_lottie',
  },
  storyName: 'webgl webgl_loader_texture_lottie',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderTexturePvrtc: Story = {
  args: {
    exampleName: 'webgl_loader_texture_pvrtc',
  },
  storyName: 'webgl webgl_loader_texture_pvrtc',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderTextureRgbm: Story = {
  args: {
    exampleName: 'webgl_loader_texture_rgbm',
  },
  storyName: 'webgl webgl_loader_texture_rgbm',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderTextureTga: Story = {
  args: {
    exampleName: 'webgl_loader_texture_tga',
  },
  storyName: 'webgl webgl_loader_texture_tga',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderTextureTiff: Story = {
  args: {
    exampleName: 'webgl_loader_texture_tiff',
  },
  storyName: 'webgl webgl_loader_texture_tiff',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderTtf: Story = {
  args: {
    exampleName: 'webgl_loader_ttf',
  },
  storyName: 'webgl webgl_loader_ttf',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderUsdz: Story = {
  args: {
    exampleName: 'webgl_loader_usdz',
  },
  storyName: 'webgl webgl_loader_usdz',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderVox: Story = {
  args: {
    exampleName: 'webgl_loader_vox',
  },
  storyName: 'webgl webgl_loader_vox',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderVrml: Story = {
  args: {
    exampleName: 'webgl_loader_vrml',
  },
  storyName: 'webgl webgl_loader_vrml',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderVtk: Story = {
  args: {
    exampleName: 'webgl_loader_vtk',
  },
  storyName: 'webgl webgl_loader_vtk',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLoaderXyz: Story = {
  args: {
    exampleName: 'webgl_loader_xyz',
  },
  storyName: 'webgl webgl_loader_xyz',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglLod: Story = {
  args: {
    exampleName: 'webgl_lod',
  },
  storyName: 'webgl webgl_lod',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMarchingcubes: Story = {
  args: {
    exampleName: 'webgl_marchingcubes',
  },
  storyName: 'webgl webgl_marchingcubes',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsAlphahash: Story = {
  args: {
    exampleName: 'webgl_materials_alphahash',
  },
  storyName: 'webgl webgl_materials_alphahash',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsBlending: Story = {
  args: {
    exampleName: 'webgl_materials_blending',
  },
  storyName: 'webgl webgl_materials_blending',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsBlendingCustom: Story = {
  args: {
    exampleName: 'webgl_materials_blending_custom',
  },
  storyName: 'webgl webgl_materials_blending_custom',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsBumpmap: Story = {
  args: {
    exampleName: 'webgl_materials_bumpmap',
  },
  storyName: 'webgl webgl_materials_bumpmap',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsCar: Story = {
  args: {
    exampleName: 'webgl_materials_car',
  },
  storyName: 'webgl webgl_materials_car',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsChannels: Story = {
  args: {
    exampleName: 'webgl_materials_channels',
  },
  storyName: 'webgl webgl_materials_channels',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsCubemap: Story = {
  args: {
    exampleName: 'webgl_materials_cubemap',
  },
  storyName: 'webgl webgl_materials_cubemap',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsCubemapDynamic: Story = {
  args: {
    exampleName: 'webgl_materials_cubemap_dynamic',
  },
  storyName: 'webgl webgl_materials_cubemap_dynamic',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsCubemapRefraction: Story = {
  args: {
    exampleName: 'webgl_materials_cubemap_refraction',
  },
  storyName: 'webgl webgl_materials_cubemap_refraction',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsCubemapMipmaps: Story = {
  args: {
    exampleName: 'webgl_materials_cubemap_mipmaps',
  },
  storyName: 'webgl webgl_materials_cubemap_mipmaps',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsCubemapRenderToMipmaps: Story = {
  args: {
    exampleName: 'webgl_materials_cubemap_render_to_mipmaps',
  },
  storyName: 'webgl webgl_materials_cubemap_render_to_mipmaps',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsDisplacementmap: Story = {
  args: {
    exampleName: 'webgl_materials_displacementmap',
  },
  storyName: 'webgl webgl_materials_displacementmap',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsEnvmaps: Story = {
  args: {
    exampleName: 'webgl_materials_envmaps',
  },
  storyName: 'webgl webgl_materials_envmaps',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsEnvmapsExr: Story = {
  args: {
    exampleName: 'webgl_materials_envmaps_exr',
  },
  storyName: 'webgl webgl_materials_envmaps_exr',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsEnvmapsGroundprojected: Story = {
  args: {
    exampleName: 'webgl_materials_envmaps_groundprojected',
  },
  storyName: 'webgl webgl_materials_envmaps_groundprojected',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsEnvmapsHdr: Story = {
  args: {
    exampleName: 'webgl_materials_envmaps_hdr',
  },
  storyName: 'webgl webgl_materials_envmaps_hdr',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsMatcap: Story = {
  args: {
    exampleName: 'webgl_materials_matcap',
  },
  storyName: 'webgl webgl_materials_matcap',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsNormalmap: Story = {
  args: {
    exampleName: 'webgl_materials_normalmap',
  },
  storyName: 'webgl webgl_materials_normalmap',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsNormalmapObjectSpace: Story = {
  args: {
    exampleName: 'webgl_materials_normalmap_object_space',
  },
  storyName: 'webgl webgl_materials_normalmap_object_space',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsPhysicalClearcoat: Story = {
  args: {
    exampleName: 'webgl_materials_physical_clearcoat',
  },
  storyName: 'webgl webgl_materials_physical_clearcoat',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsPhysicalTransmission: Story = {
  args: {
    exampleName: 'webgl_materials_physical_transmission',
  },
  storyName: 'webgl webgl_materials_physical_transmission',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsPhysicalTransmissionAlpha: Story = {
  args: {
    exampleName: 'webgl_materials_physical_transmission_alpha',
  },
  storyName: 'webgl webgl_materials_physical_transmission_alpha',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsSubsurfaceScattering: Story = {
  args: {
    exampleName: 'webgl_materials_subsurface_scattering',
  },
  storyName: 'webgl webgl_materials_subsurface_scattering',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsTextureAnisotropy: Story = {
  args: {
    exampleName: 'webgl_materials_texture_anisotropy',
  },
  storyName: 'webgl webgl_materials_texture_anisotropy',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsTextureCanvas: Story = {
  args: {
    exampleName: 'webgl_materials_texture_canvas',
  },
  storyName: 'webgl webgl_materials_texture_canvas',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsTextureFilters: Story = {
  args: {
    exampleName: 'webgl_materials_texture_filters',
  },
  storyName: 'webgl webgl_materials_texture_filters',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsTextureManualmipmap: Story = {
  args: {
    exampleName: 'webgl_materials_texture_manualmipmap',
  },
  storyName: 'webgl webgl_materials_texture_manualmipmap',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsTexturePartialupdate: Story = {
  args: {
    exampleName: 'webgl_materials_texture_partialupdate',
  },
  storyName: 'webgl webgl_materials_texture_partialupdate',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsTextureRotation: Story = {
  args: {
    exampleName: 'webgl_materials_texture_rotation',
  },
  storyName: 'webgl webgl_materials_texture_rotation',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsToon: Story = {
  args: {
    exampleName: 'webgl_materials_toon',
  },
  storyName: 'webgl webgl_materials_toon',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsVideo: Story = {
  args: {
    exampleName: 'webgl_materials_video',
  },
  storyName: 'webgl webgl_materials_video',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsVideoWebcam: Story = {
  args: {
    exampleName: 'webgl_materials_video_webcam',
  },
  storyName: 'webgl webgl_materials_video_webcam',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsWireframe: Story = {
  args: {
    exampleName: 'webgl_materials_wireframe',
  },
  storyName: 'webgl webgl_materials_wireframe',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMathObb: Story = {
  args: {
    exampleName: 'webgl_math_obb',
  },
  storyName: 'webgl webgl_math_obb',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMathOrientationTransform: Story = {
  args: {
    exampleName: 'webgl_math_orientation_transform',
  },
  storyName: 'webgl webgl_math_orientation_transform',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMeshBatch: Story = {
  args: {
    exampleName: 'webgl_mesh_batch',
  },
  storyName: 'webgl webgl_mesh_batch',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMirror: Story = {
  args: {
    exampleName: 'webgl_mirror',
  },
  storyName: 'webgl webgl_mirror',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglModifierCurve: Story = {
  args: {
    exampleName: 'webgl_modifier_curve',
  },
  storyName: 'webgl webgl_modifier_curve',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglModifierCurveInstanced: Story = {
  args: {
    exampleName: 'webgl_modifier_curve_instanced',
  },
  storyName: 'webgl webgl_modifier_curve_instanced',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglModifierEdgesplit: Story = {
  args: {
    exampleName: 'webgl_modifier_edgesplit',
  },
  storyName: 'webgl webgl_modifier_edgesplit',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglModifierSimplifier: Story = {
  args: {
    exampleName: 'webgl_modifier_simplifier',
  },
  storyName: 'webgl webgl_modifier_simplifier',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglModifierSubdivision: Story = {
  args: {
    exampleName: 'webgl_modifier_subdivision',
  },
  storyName: 'webgl webgl_modifier_subdivision',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglModifierTessellation: Story = {
  args: {
    exampleName: 'webgl_modifier_tessellation',
  },
  storyName: 'webgl webgl_modifier_tessellation',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMorphtargets: Story = {
  args: {
    exampleName: 'webgl_morphtargets',
  },
  storyName: 'webgl webgl_morphtargets',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMorphtargetsFace: Story = {
  args: {
    exampleName: 'webgl_morphtargets_face',
  },
  storyName: 'webgl webgl_morphtargets_face',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMorphtargetsHorse: Story = {
  args: {
    exampleName: 'webgl_morphtargets_horse',
  },
  storyName: 'webgl webgl_morphtargets_horse',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMorphtargetsSphere: Story = {
  args: {
    exampleName: 'webgl_morphtargets_sphere',
  },
  storyName: 'webgl webgl_morphtargets_sphere',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMorphtargetsWebcam: Story = {
  args: {
    exampleName: 'webgl_morphtargets_webcam',
  },
  storyName: 'webgl webgl_morphtargets_webcam',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMultipleElements: Story = {
  args: {
    exampleName: 'webgl_multiple_elements',
  },
  storyName: 'webgl webgl_multiple_elements',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMultipleElementsText: Story = {
  args: {
    exampleName: 'webgl_multiple_elements_text',
  },
  storyName: 'webgl webgl_multiple_elements_text',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMultipleScenesComparison: Story = {
  args: {
    exampleName: 'webgl_multiple_scenes_comparison',
  },
  storyName: 'webgl webgl_multiple_scenes_comparison',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMultipleViews: Story = {
  args: {
    exampleName: 'webgl_multiple_views',
  },
  storyName: 'webgl webgl_multiple_views',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPanoramaCube: Story = {
  args: {
    exampleName: 'webgl_panorama_cube',
  },
  storyName: 'webgl webgl_panorama_cube',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPanoramaEquirectangular: Story = {
  args: {
    exampleName: 'webgl_panorama_equirectangular',
  },
  storyName: 'webgl webgl_panorama_equirectangular',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPointsBillboards: Story = {
  args: {
    exampleName: 'webgl_points_billboards',
  },
  storyName: 'webgl webgl_points_billboards',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPointsDynamic: Story = {
  args: {
    exampleName: 'webgl_points_dynamic',
  },
  storyName: 'webgl webgl_points_dynamic',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPointsSprites: Story = {
  args: {
    exampleName: 'webgl_points_sprites',
  },
  storyName: 'webgl webgl_points_sprites',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPointsWaves: Story = {
  args: {
    exampleName: 'webgl_points_waves',
  },
  storyName: 'webgl webgl_points_waves',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPortal: Story = {
  args: {
    exampleName: 'webgl_portal',
  },
  storyName: 'webgl webgl_portal',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglRaycasterBvh: Story = {
  args: {
    exampleName: 'webgl_raycaster_bvh',
  },
  storyName: 'webgl webgl_raycaster_bvh',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglRaycasterSprite: Story = {
  args: {
    exampleName: 'webgl_raycaster_sprite',
  },
  storyName: 'webgl webgl_raycaster_sprite',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglRaycasterTexture: Story = {
  args: {
    exampleName: 'webgl_raycaster_texture',
  },
  storyName: 'webgl webgl_raycaster_texture',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglReadFloatBuffer: Story = {
  args: {
    exampleName: 'webgl_read_float_buffer',
  },
  storyName: 'webgl webgl_read_float_buffer',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglRendererPathtracer: Story = {
  args: {
    exampleName: 'webgl_renderer_pathtracer',
  },
  storyName: 'webgl webgl_renderer_pathtracer',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglRefraction: Story = {
  args: {
    exampleName: 'webgl_refraction',
  },
  storyName: 'webgl webgl_refraction',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglRtt: Story = {
  args: {
    exampleName: 'webgl_rtt',
  },
  storyName: 'webgl webgl_rtt',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglShader: Story = {
  args: {
    exampleName: 'webgl_shader',
  },
  storyName: 'webgl webgl_shader',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglShaderLava: Story = {
  args: {
    exampleName: 'webgl_shader_lava',
  },
  storyName: 'webgl webgl_shader_lava',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglShadersOcean: Story = {
  args: {
    exampleName: 'webgl_shaders_ocean',
  },
  storyName: 'webgl webgl_shaders_ocean',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglShadersSky: Story = {
  args: {
    exampleName: 'webgl_shaders_sky',
  },
  storyName: 'webgl webgl_shaders_sky',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglShadowContact: Story = {
  args: {
    exampleName: 'webgl_shadow_contact',
  },
  storyName: 'webgl webgl_shadow_contact',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglShadowmap: Story = {
  args: {
    exampleName: 'webgl_shadowmap',
  },
  storyName: 'webgl webgl_shadowmap',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglShadowmapPerformance: Story = {
  args: {
    exampleName: 'webgl_shadowmap_performance',
  },
  storyName: 'webgl webgl_shadowmap_performance',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglShadowmapPointlight: Story = {
  args: {
    exampleName: 'webgl_shadowmap_pointlight',
  },
  storyName: 'webgl webgl_shadowmap_pointlight',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglShadowmapViewer: Story = {
  args: {
    exampleName: 'webgl_shadowmap_viewer',
  },
  storyName: 'webgl webgl_shadowmap_viewer',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglShadowmapVsm: Story = {
  args: {
    exampleName: 'webgl_shadowmap_vsm',
  },
  storyName: 'webgl webgl_shadowmap_vsm',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglShadowmesh: Story = {
  args: {
    exampleName: 'webgl_shadowmesh',
  },
  storyName: 'webgl webgl_shadowmesh',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglSprites: Story = {
  args: {
    exampleName: 'webgl_sprites',
  },
  storyName: 'webgl webgl_sprites',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglTestMemory: Story = {
  args: {
    exampleName: 'webgl_test_memory',
  },
  storyName: 'webgl webgl_test_memory',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglTestMemory2: Story = {
  args: {
    exampleName: 'webgl_test_memory2',
  },
  storyName: 'webgl webgl_test_memory2',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglTestWideGamut: Story = {
  args: {
    exampleName: 'webgl_test_wide_gamut',
  },
  storyName: 'webgl webgl_test_wide_gamut',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglTonemapping: Story = {
  args: {
    exampleName: 'webgl_tonemapping',
  },
  storyName: 'webgl webgl_tonemapping',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglVideoKinect: Story = {
  args: {
    exampleName: 'webgl_video_kinect',
  },
  storyName: 'webgl webgl_video_kinect',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglVideoPanoramaEquirectangular: Story = {
  args: {
    exampleName: 'webgl_video_panorama_equirectangular',
  },
  storyName: 'webgl webgl_video_panorama_equirectangular',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglWater: Story = {
  args: {
    exampleName: 'webgl_water',
  },
  storyName: 'webgl webgl_water',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglWaterFlowmap: Story = {
  args: {
    exampleName: 'webgl_water_flowmap',
  },
  storyName: 'webgl webgl_water_flowmap',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessing: Story = {
  args: {
    exampleName: 'webgl_postprocessing',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessing3Dlut: Story = {
  args: {
    exampleName: 'webgl_postprocessing_3dlut',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_3dlut',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingAdvanced: Story = {
  args: {
    exampleName: 'webgl_postprocessing_advanced',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_advanced',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingAfterimage: Story = {
  args: {
    exampleName: 'webgl_postprocessing_afterimage',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_afterimage',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingBackgrounds: Story = {
  args: {
    exampleName: 'webgl_postprocessing_backgrounds',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_backgrounds',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingTransition: Story = {
  args: {
    exampleName: 'webgl_postprocessing_transition',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_transition',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingDof: Story = {
  args: {
    exampleName: 'webgl_postprocessing_dof',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_dof',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingDof2: Story = {
  args: {
    exampleName: 'webgl_postprocessing_dof2',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_dof2',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingFxaa: Story = {
  args: {
    exampleName: 'webgl_postprocessing_fxaa',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_fxaa',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingGlitch: Story = {
  args: {
    exampleName: 'webgl_postprocessing_glitch',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_glitch',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingGodrays: Story = {
  args: {
    exampleName: 'webgl_postprocessing_godrays',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_godrays',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingGtao: Story = {
  args: {
    exampleName: 'webgl_postprocessing_gtao',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_gtao',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingRgbHalftone: Story = {
  args: {
    exampleName: 'webgl_postprocessing_rgb_halftone',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_rgb_halftone',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingMasking: Story = {
  args: {
    exampleName: 'webgl_postprocessing_masking',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_masking',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingMaterialAo: Story = {
  args: {
    exampleName: 'webgl_postprocessing_material_ao',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_material_ao',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingSsaa: Story = {
  args: {
    exampleName: 'webgl_postprocessing_ssaa',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_ssaa',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingOutline: Story = {
  args: {
    exampleName: 'webgl_postprocessing_outline',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_outline',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingPixel: Story = {
  args: {
    exampleName: 'webgl_postprocessing_pixel',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_pixel',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingProcedural: Story = {
  args: {
    exampleName: 'webgl_postprocessing_procedural',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_procedural',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingSao: Story = {
  args: {
    exampleName: 'webgl_postprocessing_sao',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_sao',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingSmaa: Story = {
  args: {
    exampleName: 'webgl_postprocessing_smaa',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_smaa',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingSobel: Story = {
  args: {
    exampleName: 'webgl_postprocessing_sobel',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_sobel',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingSsao: Story = {
  args: {
    exampleName: 'webgl_postprocessing_ssao',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_ssao',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingSsr: Story = {
  args: {
    exampleName: 'webgl_postprocessing_ssr',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_ssr',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingTaa: Story = {
  args: {
    exampleName: 'webgl_postprocessing_taa',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_taa',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingUnrealBloom: Story = {
  args: {
    exampleName: 'webgl_postprocessing_unreal_bloom',
  },
  storyName: 'webgl   postprocessing webgl_postprocessing_unreal_bloom',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPostprocessingUnrealBloomSelective: Story = {
  args: {
    exampleName: 'webgl_postprocessing_unreal_bloom_selective',
  },
  storyName:
    'webgl   postprocessing webgl_postprocessing_unreal_bloom_selective',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglBuffergeometry: Story = {
  args: {
    exampleName: 'webgl_buffergeometry',
  },
  storyName: 'webgl   advanced webgl_buffergeometry',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglBuffergeometryAttributesInteger: Story = {
  args: {
    exampleName: 'webgl_buffergeometry_attributes_integer',
  },
  storyName: 'webgl   advanced webgl_buffergeometry_attributes_integer',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglBuffergeometryAttributesNone: Story = {
  args: {
    exampleName: 'webgl_buffergeometry_attributes_none',
  },
  storyName: 'webgl   advanced webgl_buffergeometry_attributes_none',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglBuffergeometryCustomAttributesParticles: Story = {
  args: {
    exampleName: 'webgl_buffergeometry_custom_attributes_particles',
  },
  storyName:
    'webgl   advanced webgl_buffergeometry_custom_attributes_particles',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglBuffergeometryDrawrange: Story = {
  args: {
    exampleName: 'webgl_buffergeometry_drawrange',
  },
  storyName: 'webgl   advanced webgl_buffergeometry_drawrange',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglBuffergeometryGlbufferattribute: Story = {
  args: {
    exampleName: 'webgl_buffergeometry_glbufferattribute',
  },
  storyName: 'webgl   advanced webgl_buffergeometry_glbufferattribute',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglBuffergeometryIndexed: Story = {
  args: {
    exampleName: 'webgl_buffergeometry_indexed',
  },
  storyName: 'webgl   advanced webgl_buffergeometry_indexed',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglBuffergeometryInstancing: Story = {
  args: {
    exampleName: 'webgl_buffergeometry_instancing',
  },
  storyName: 'webgl   advanced webgl_buffergeometry_instancing',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglBuffergeometryInstancingBillboards: Story = {
  args: {
    exampleName: 'webgl_buffergeometry_instancing_billboards',
  },
  storyName: 'webgl   advanced webgl_buffergeometry_instancing_billboards',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglBuffergeometryInstancingInterleaved: Story = {
  args: {
    exampleName: 'webgl_buffergeometry_instancing_interleaved',
  },
  storyName: 'webgl   advanced webgl_buffergeometry_instancing_interleaved',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglBuffergeometryLines: Story = {
  args: {
    exampleName: 'webgl_buffergeometry_lines',
  },
  storyName: 'webgl   advanced webgl_buffergeometry_lines',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglBuffergeometryLinesIndexed: Story = {
  args: {
    exampleName: 'webgl_buffergeometry_lines_indexed',
  },
  storyName: 'webgl   advanced webgl_buffergeometry_lines_indexed',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglBuffergeometryPoints: Story = {
  args: {
    exampleName: 'webgl_buffergeometry_points',
  },
  storyName: 'webgl   advanced webgl_buffergeometry_points',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglBuffergeometryPointsInterleaved: Story = {
  args: {
    exampleName: 'webgl_buffergeometry_points_interleaved',
  },
  storyName: 'webgl   advanced webgl_buffergeometry_points_interleaved',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglBuffergeometryRawshader: Story = {
  args: {
    exampleName: 'webgl_buffergeometry_rawshader',
  },
  storyName: 'webgl   advanced webgl_buffergeometry_rawshader',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglBuffergeometrySelectiveDraw: Story = {
  args: {
    exampleName: 'webgl_buffergeometry_selective_draw',
  },
  storyName: 'webgl   advanced webgl_buffergeometry_selective_draw',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglBuffergeometryUint: Story = {
  args: {
    exampleName: 'webgl_buffergeometry_uint',
  },
  storyName: 'webgl   advanced webgl_buffergeometry_uint',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglClipculldistance: Story = {
  args: {
    exampleName: 'webgl_clipculldistance',
  },
  storyName: 'webgl   advanced webgl_clipculldistance',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglCustomAttributes: Story = {
  args: {
    exampleName: 'webgl_custom_attributes',
  },
  storyName: 'webgl   advanced webgl_custom_attributes',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglCustomAttributesLines: Story = {
  args: {
    exampleName: 'webgl_custom_attributes_lines',
  },
  storyName: 'webgl   advanced webgl_custom_attributes_lines',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglCustomAttributesPoints: Story = {
  args: {
    exampleName: 'webgl_custom_attributes_points',
  },
  storyName: 'webgl   advanced webgl_custom_attributes_points',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglCustomAttributesPoints2: Story = {
  args: {
    exampleName: 'webgl_custom_attributes_points2',
  },
  storyName: 'webgl   advanced webgl_custom_attributes_points2',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglCustomAttributesPoints3: Story = {
  args: {
    exampleName: 'webgl_custom_attributes_points3',
  },
  storyName: 'webgl   advanced webgl_custom_attributes_points3',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGpgpuBirds: Story = {
  args: {
    exampleName: 'webgl_gpgpu_birds',
  },
  storyName: 'webgl   advanced webgl_gpgpu_birds',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGpgpuBirdsGltf: Story = {
  args: {
    exampleName: 'webgl_gpgpu_birds_gltf',
  },
  storyName: 'webgl   advanced webgl_gpgpu_birds_gltf',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGpgpuWater: Story = {
  args: {
    exampleName: 'webgl_gpgpu_water',
  },
  storyName: 'webgl   advanced webgl_gpgpu_water',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglGpgpuProtoplanet: Story = {
  args: {
    exampleName: 'webgl_gpgpu_protoplanet',
  },
  storyName: 'webgl   advanced webgl_gpgpu_protoplanet',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMaterialsModified: Story = {
  args: {
    exampleName: 'webgl_materials_modified',
  },
  storyName: 'webgl   advanced webgl_materials_modified',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMultipleRendertargets: Story = {
  args: {
    exampleName: 'webgl_multiple_rendertargets',
  },
  storyName: 'webgl   advanced webgl_multiple_rendertargets',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglMultisampledRenderbuffers: Story = {
  args: {
    exampleName: 'webgl_multisampled_renderbuffers',
  },
  storyName: 'webgl   advanced webgl_multisampled_renderbuffers',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglRendertargetTexture2Darray: Story = {
  args: {
    exampleName: 'webgl_rendertarget_texture2darray',
  },
  storyName: 'webgl   advanced webgl_rendertarget_texture2darray',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglShadowmapCsm: Story = {
  args: {
    exampleName: 'webgl_shadowmap_csm',
  },
  storyName: 'webgl   advanced webgl_shadowmap_csm',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglShadowmapPcss: Story = {
  args: {
    exampleName: 'webgl_shadowmap_pcss',
  },
  storyName: 'webgl   advanced webgl_shadowmap_pcss',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglShadowmapProgressive: Story = {
  args: {
    exampleName: 'webgl_shadowmap_progressive',
  },
  storyName: 'webgl   advanced webgl_shadowmap_progressive',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglSimpleGi: Story = {
  args: {
    exampleName: 'webgl_simple_gi',
  },
  storyName: 'webgl   advanced webgl_simple_gi',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglTexture2Darray: Story = {
  args: {
    exampleName: 'webgl_texture2darray',
  },
  storyName: 'webgl   advanced webgl_texture2darray',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglTexture2DarrayCompressed: Story = {
  args: {
    exampleName: 'webgl_texture2darray_compressed',
  },
  storyName: 'webgl   advanced webgl_texture2darray_compressed',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglTexture2DarrayLayerupdate: Story = {
  args: {
    exampleName: 'webgl_texture2darray_layerupdate',
  },
  storyName: 'webgl   advanced webgl_texture2darray_layerupdate',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglTexture3D: Story = {
  args: {
    exampleName: 'webgl_texture3d',
  },
  storyName: 'webgl   advanced webgl_texture3d',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglTexture3DPartialupdate: Story = {
  args: {
    exampleName: 'webgl_texture3d_partialupdate',
  },
  storyName: 'webgl   advanced webgl_texture3d_partialupdate',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglUbo: Story = {
  args: {
    exampleName: 'webgl_ubo',
  },
  storyName: 'webgl   advanced webgl_ubo',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglUboArrays: Story = {
  args: {
    exampleName: 'webgl_ubo_arrays',
  },
  storyName: 'webgl   advanced webgl_ubo_arrays',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglVolumeCloud: Story = {
  args: {
    exampleName: 'webgl_volume_cloud',
  },
  storyName: 'webgl   advanced webgl_volume_cloud',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglVolumeInstancing: Story = {
  args: {
    exampleName: 'webgl_volume_instancing',
  },
  storyName: 'webgl   advanced webgl_volume_instancing',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglVolumePerlin: Story = {
  args: {
    exampleName: 'webgl_volume_perlin',
  },
  storyName: 'webgl   advanced webgl_volume_perlin',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglWorkerOffscreencanvas: Story = {
  args: {
    exampleName: 'webgl_worker_offscreencanvas',
  },
  storyName: 'webgl   advanced webgl_worker_offscreencanvas',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPerformance: Story = {
  args: {
    exampleName: 'webgl_performance',
  },
  storyName: 'webgl   advanced webgl_performance',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuAnimationRetargeting: Story = {
  args: {
    exampleName: 'webgpu_animation_retargeting',
  },
  storyName: 'webgpu (wip) webgpu_animation_retargeting',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuAnimationRetargetingReadyplayer: Story = {
  args: {
    exampleName: 'webgpu_animation_retargeting_readyplayer',
  },
  storyName: 'webgpu (wip) webgpu_animation_retargeting_readyplayer',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuBackdrop: Story = {
  args: {
    exampleName: 'webgpu_backdrop',
  },
  storyName: 'webgpu (wip) webgpu_backdrop',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuBackdropArea: Story = {
  args: {
    exampleName: 'webgpu_backdrop_area',
  },
  storyName: 'webgpu (wip) webgpu_backdrop_area',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuBackdropWater: Story = {
  args: {
    exampleName: 'webgpu_backdrop_water',
  },
  storyName: 'webgpu (wip) webgpu_backdrop_water',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuCameraLogarithmicdepthbuffer: Story = {
  args: {
    exampleName: 'webgpu_camera_logarithmicdepthbuffer',
  },
  storyName: 'webgpu (wip) webgpu_camera_logarithmicdepthbuffer',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuClearcoat: Story = {
  args: {
    exampleName: 'webgpu_clearcoat',
  },
  storyName: 'webgpu (wip) webgpu_clearcoat',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuClipping: Story = {
  args: {
    exampleName: 'webgpu_clipping',
  },
  storyName: 'webgpu (wip) webgpu_clipping',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuComputeAudio: Story = {
  args: {
    exampleName: 'webgpu_compute_audio',
  },
  storyName: 'webgpu (wip) webgpu_compute_audio',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuComputeBirds: Story = {
  args: {
    exampleName: 'webgpu_compute_birds',
  },
  storyName: 'webgpu (wip) webgpu_compute_birds',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuComputeGeometry: Story = {
  args: {
    exampleName: 'webgpu_compute_geometry',
  },
  storyName: 'webgpu (wip) webgpu_compute_geometry',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuComputeParticles: Story = {
  args: {
    exampleName: 'webgpu_compute_particles',
  },
  storyName: 'webgpu (wip) webgpu_compute_particles',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuComputeParticlesRain: Story = {
  args: {
    exampleName: 'webgpu_compute_particles_rain',
  },
  storyName: 'webgpu (wip) webgpu_compute_particles_rain',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuComputeParticlesSnow: Story = {
  args: {
    exampleName: 'webgpu_compute_particles_snow',
  },
  storyName: 'webgpu (wip) webgpu_compute_particles_snow',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuComputePoints: Story = {
  args: {
    exampleName: 'webgpu_compute_points',
  },
  storyName: 'webgpu (wip) webgpu_compute_points',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuComputeSortBitonic: Story = {
  args: {
    exampleName: 'webgpu_compute_sort_bitonic',
  },
  storyName: 'webgpu (wip) webgpu_compute_sort_bitonic',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuComputeTexture: Story = {
  args: {
    exampleName: 'webgpu_compute_texture',
  },
  storyName: 'webgpu (wip) webgpu_compute_texture',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuComputeTexturePingpong: Story = {
  args: {
    exampleName: 'webgpu_compute_texture_pingpong',
  },
  storyName: 'webgpu (wip) webgpu_compute_texture_pingpong',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuComputeWater: Story = {
  args: {
    exampleName: 'webgpu_compute_water',
  },
  storyName: 'webgpu (wip) webgpu_compute_water',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuCubemapAdjustments: Story = {
  args: {
    exampleName: 'webgpu_cubemap_adjustments',
  },
  storyName: 'webgpu (wip) webgpu_cubemap_adjustments',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuCubemapDynamic: Story = {
  args: {
    exampleName: 'webgpu_cubemap_dynamic',
  },
  storyName: 'webgpu (wip) webgpu_cubemap_dynamic',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuCubemapMix: Story = {
  args: {
    exampleName: 'webgpu_cubemap_mix',
  },
  storyName: 'webgpu (wip) webgpu_cubemap_mix',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuCustomFog: Story = {
  args: {
    exampleName: 'webgpu_custom_fog',
  },
  storyName: 'webgpu (wip) webgpu_custom_fog',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuCustomFogBackground: Story = {
  args: {
    exampleName: 'webgpu_custom_fog_background',
  },
  storyName: 'webgpu (wip) webgpu_custom_fog_background',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuDepthTexture: Story = {
  args: {
    exampleName: 'webgpu_depth_texture',
  },
  storyName: 'webgpu (wip) webgpu_depth_texture',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuDisplayStereo: Story = {
  args: {
    exampleName: 'webgpu_display_stereo',
  },
  storyName: 'webgpu (wip) webgpu_display_stereo',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuEquirectangular: Story = {
  args: {
    exampleName: 'webgpu_equirectangular',
  },
  storyName: 'webgpu (wip) webgpu_equirectangular',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuInstanceMesh: Story = {
  args: {
    exampleName: 'webgpu_instance_mesh',
  },
  storyName: 'webgpu (wip) webgpu_instance_mesh',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuInstancePoints: Story = {
  args: {
    exampleName: 'webgpu_instance_points',
  },
  storyName: 'webgpu (wip) webgpu_instance_points',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuInstanceSprites: Story = {
  args: {
    exampleName: 'webgpu_instance_sprites',
  },
  storyName: 'webgpu (wip) webgpu_instance_sprites',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuInstanceUniform: Story = {
  args: {
    exampleName: 'webgpu_instance_uniform',
  },
  storyName: 'webgpu (wip) webgpu_instance_uniform',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuInstancingMorph: Story = {
  args: {
    exampleName: 'webgpu_instancing_morph',
  },
  storyName: 'webgpu (wip) webgpu_instancing_morph',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLensflares: Story = {
  args: {
    exampleName: 'webgpu_lensflares',
  },
  storyName: 'webgpu (wip) webgpu_lensflares',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLightprobe: Story = {
  args: {
    exampleName: 'webgpu_lightprobe',
  },
  storyName: 'webgpu (wip) webgpu_lightprobe',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLightprobeCubecamera: Story = {
  args: {
    exampleName: 'webgpu_lightprobe_cubecamera',
  },
  storyName: 'webgpu (wip) webgpu_lightprobe_cubecamera',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLightsCustom: Story = {
  args: {
    exampleName: 'webgpu_lights_custom',
  },
  storyName: 'webgpu (wip) webgpu_lights_custom',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLightsIesSpotlight: Story = {
  args: {
    exampleName: 'webgpu_lights_ies_spotlight',
  },
  storyName: 'webgpu (wip) webgpu_lights_ies_spotlight',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLightsPhong: Story = {
  args: {
    exampleName: 'webgpu_lights_phong',
  },
  storyName: 'webgpu (wip) webgpu_lights_phong',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLightsRectarealight: Story = {
  args: {
    exampleName: 'webgpu_lights_rectarealight',
  },
  storyName: 'webgpu (wip) webgpu_lights_rectarealight',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLightsSelective: Story = {
  args: {
    exampleName: 'webgpu_lights_selective',
  },
  storyName: 'webgpu (wip) webgpu_lights_selective',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLightsTiled: Story = {
  args: {
    exampleName: 'webgpu_lights_tiled',
  },
  storyName: 'webgpu (wip) webgpu_lights_tiled',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLinesFatWireframe: Story = {
  args: {
    exampleName: 'webgpu_lines_fat_wireframe',
  },
  storyName: 'webgpu (wip) webgpu_lines_fat_wireframe',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLinesFat: Story = {
  args: {
    exampleName: 'webgpu_lines_fat',
  },
  storyName: 'webgpu (wip) webgpu_lines_fat',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLoaderGltf: Story = {
  args: {
    exampleName: 'webgpu_loader_gltf',
  },
  storyName: 'webgpu (wip) webgpu_loader_gltf',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLoaderGltfAnisotropy: Story = {
  args: {
    exampleName: 'webgpu_loader_gltf_anisotropy',
  },
  storyName: 'webgpu (wip) webgpu_loader_gltf_anisotropy',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLoaderGltfCompressed: Story = {
  args: {
    exampleName: 'webgpu_loader_gltf_compressed',
  },
  storyName: 'webgpu (wip) webgpu_loader_gltf_compressed',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLoaderGltfDispersion: Story = {
  args: {
    exampleName: 'webgpu_loader_gltf_dispersion',
  },
  storyName: 'webgpu (wip) webgpu_loader_gltf_dispersion',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLoaderGltfIridescence: Story = {
  args: {
    exampleName: 'webgpu_loader_gltf_iridescence',
  },
  storyName: 'webgpu (wip) webgpu_loader_gltf_iridescence',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLoaderGltfSheen: Story = {
  args: {
    exampleName: 'webgpu_loader_gltf_sheen',
  },
  storyName: 'webgpu (wip) webgpu_loader_gltf_sheen',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLoaderGltfTransmission: Story = {
  args: {
    exampleName: 'webgpu_loader_gltf_transmission',
  },
  storyName: 'webgpu (wip) webgpu_loader_gltf_transmission',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuLoaderMaterialx: Story = {
  args: {
    exampleName: 'webgpu_loader_materialx',
  },
  storyName: 'webgpu (wip) webgpu_loader_materialx',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMaterials: Story = {
  args: {
    exampleName: 'webgpu_materials',
  },
  storyName: 'webgpu (wip) webgpu_materials',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMaterialsAlphahash: Story = {
  args: {
    exampleName: 'webgpu_materials_alphahash',
  },
  storyName: 'webgpu (wip) webgpu_materials_alphahash',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMaterialsArrays: Story = {
  args: {
    exampleName: 'webgpu_materials_arrays',
  },
  storyName: 'webgpu (wip) webgpu_materials_arrays',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMaterialsBasic: Story = {
  args: {
    exampleName: 'webgpu_materials_basic',
  },
  storyName: 'webgpu (wip) webgpu_materials_basic',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMaterialsDisplacementmap: Story = {
  args: {
    exampleName: 'webgpu_materials_displacementmap',
  },
  storyName: 'webgpu (wip) webgpu_materials_displacementmap',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMaterialsEnvmapsBpcem: Story = {
  args: {
    exampleName: 'webgpu_materials_envmaps_bpcem',
  },
  storyName: 'webgpu (wip) webgpu_materials_envmaps_bpcem',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMaterialsEnvmaps: Story = {
  args: {
    exampleName: 'webgpu_materials_envmaps',
  },
  storyName: 'webgpu (wip) webgpu_materials_envmaps',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMaterialsLightmap: Story = {
  args: {
    exampleName: 'webgpu_materials_lightmap',
  },
  storyName: 'webgpu (wip) webgpu_materials_lightmap',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMaterialsMatcap: Story = {
  args: {
    exampleName: 'webgpu_materials_matcap',
  },
  storyName: 'webgpu (wip) webgpu_materials_matcap',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMaterialsSss: Story = {
  args: {
    exampleName: 'webgpu_materials_sss',
  },
  storyName: 'webgpu (wip) webgpu_materials_sss',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMaterialsTransmission: Story = {
  args: {
    exampleName: 'webgpu_materials_transmission',
  },
  storyName: 'webgpu (wip) webgpu_materials_transmission',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMaterialsToon: Story = {
  args: {
    exampleName: 'webgpu_materials_toon',
  },
  storyName: 'webgpu (wip) webgpu_materials_toon',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMaterialsVideo: Story = {
  args: {
    exampleName: 'webgpu_materials_video',
  },
  storyName: 'webgpu (wip) webgpu_materials_video',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMaterialxNoise: Story = {
  args: {
    exampleName: 'webgpu_materialx_noise',
  },
  storyName: 'webgpu (wip) webgpu_materialx_noise',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMeshBatch: Story = {
  args: {
    exampleName: 'webgpu_mesh_batch',
  },
  storyName: 'webgpu (wip) webgpu_mesh_batch',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMirror: Story = {
  args: {
    exampleName: 'webgpu_mirror',
  },
  storyName: 'webgpu (wip) webgpu_mirror',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuModifierCurve: Story = {
  args: {
    exampleName: 'webgpu_modifier_curve',
  },
  storyName: 'webgpu (wip) webgpu_modifier_curve',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMorphtargets: Story = {
  args: {
    exampleName: 'webgpu_morphtargets',
  },
  storyName: 'webgpu (wip) webgpu_morphtargets',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMorphtargetsFace: Story = {
  args: {
    exampleName: 'webgpu_morphtargets_face',
  },
  storyName: 'webgpu (wip) webgpu_morphtargets_face',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMrt: Story = {
  args: {
    exampleName: 'webgpu_mrt',
  },
  storyName: 'webgpu (wip) webgpu_mrt',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMrtMask: Story = {
  args: {
    exampleName: 'webgpu_mrt_mask',
  },
  storyName: 'webgpu (wip) webgpu_mrt_mask',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMultipleRendertargets: Story = {
  args: {
    exampleName: 'webgpu_multiple_rendertargets',
  },
  storyName: 'webgpu (wip) webgpu_multiple_rendertargets',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMultipleRendertargetsReadback: Story = {
  args: {
    exampleName: 'webgpu_multiple_rendertargets_readback',
  },
  storyName: 'webgpu (wip) webgpu_multiple_rendertargets_readback',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuMultisampledRenderbuffers: Story = {
  args: {
    exampleName: 'webgpu_multisampled_renderbuffers',
  },
  storyName: 'webgpu (wip) webgpu_multisampled_renderbuffers',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuOcclusion: Story = {
  args: {
    exampleName: 'webgpu_occlusion',
  },
  storyName: 'webgpu (wip) webgpu_occlusion',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuOcean: Story = {
  args: {
    exampleName: 'webgpu_ocean',
  },
  storyName: 'webgpu (wip) webgpu_ocean',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuParallaxUv: Story = {
  args: {
    exampleName: 'webgpu_parallax_uv',
  },
  storyName: 'webgpu (wip) webgpu_parallax_uv',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuParticles: Story = {
  args: {
    exampleName: 'webgpu_particles',
  },
  storyName: 'webgpu (wip) webgpu_particles',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPerformance: Story = {
  args: {
    exampleName: 'webgpu_performance',
  },
  storyName: 'webgpu (wip) webgpu_performance',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPerformanceRenderbundle: Story = {
  args: {
    exampleName: 'webgpu_performance_renderbundle',
  },
  storyName: 'webgpu (wip) webgpu_performance_renderbundle',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPmremCubemap: Story = {
  args: {
    exampleName: 'webgpu_pmrem_cubemap',
  },
  storyName: 'webgpu (wip) webgpu_pmrem_cubemap',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPmremEquirectangular: Story = {
  args: {
    exampleName: 'webgpu_pmrem_equirectangular',
  },
  storyName: 'webgpu (wip) webgpu_pmrem_equirectangular',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPmremScene: Story = {
  args: {
    exampleName: 'webgpu_pmrem_scene',
  },
  storyName: 'webgpu (wip) webgpu_pmrem_scene',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPortal: Story = {
  args: {
    exampleName: 'webgpu_portal',
  },
  storyName: 'webgpu (wip) webgpu_portal',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessing3Dlut: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_3dlut',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_3dlut',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingAfterimage: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_afterimage',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_afterimage',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingAnamorphic: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_anamorphic',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_anamorphic',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingAo: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_ao',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_ao',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingBloom: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_bloom',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_bloom',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingBloomEmissive: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_bloom_emissive',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_bloom_emissive',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingBloomSelective: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_bloom_selective',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_bloom_selective',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingDifference: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_difference',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_difference',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingDof: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_dof',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_dof',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingPixel: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_pixel',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_pixel',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingFxaa: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_fxaa',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_fxaa',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingLensflare: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_lensflare',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_lensflare',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingMasking: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_masking',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_masking',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingMotionBlur: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_motion_blur',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_motion_blur',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingOutline: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_outline',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_outline',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingSmaa: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_smaa',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_smaa',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingSobel: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_sobel',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_sobel',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingSsaa: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_ssaa',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_ssaa',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingSsr: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_ssr',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_ssr',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingTraa: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_traa',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_traa',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessingTransition: Story = {
  args: {
    exampleName: 'webgpu_postprocessing_transition',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing_transition',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuPostprocessing: Story = {
  args: {
    exampleName: 'webgpu_postprocessing',
  },
  storyName: 'webgpu (wip) webgpu_postprocessing',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuProceduralTexture: Story = {
  args: {
    exampleName: 'webgpu_procedural_texture',
  },
  storyName: 'webgpu (wip) webgpu_procedural_texture',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuReflection: Story = {
  args: {
    exampleName: 'webgpu_reflection',
  },
  storyName: 'webgpu (wip) webgpu_reflection',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuRefraction: Story = {
  args: {
    exampleName: 'webgpu_refraction',
  },
  storyName: 'webgpu (wip) webgpu_refraction',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuRtt: Story = {
  args: {
    exampleName: 'webgpu_rtt',
  },
  storyName: 'webgpu (wip) webgpu_rtt',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuSandbox: Story = {
  args: {
    exampleName: 'webgpu_sandbox',
  },
  storyName: 'webgpu (wip) webgpu_sandbox',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuShadertoy: Story = {
  args: {
    exampleName: 'webgpu_shadertoy',
  },
  storyName: 'webgpu (wip) webgpu_shadertoy',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuShadowmap: Story = {
  args: {
    exampleName: 'webgpu_shadowmap',
  },
  storyName: 'webgpu (wip) webgpu_shadowmap',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuShadowmapCsm: Story = {
  args: {
    exampleName: 'webgpu_shadowmap_csm',
  },
  storyName: 'webgpu (wip) webgpu_shadowmap_csm',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuShadowmapOpacity: Story = {
  args: {
    exampleName: 'webgpu_shadowmap_opacity',
  },
  storyName: 'webgpu (wip) webgpu_shadowmap_opacity',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuShadowmapProgressive: Story = {
  args: {
    exampleName: 'webgpu_shadowmap_progressive',
  },
  storyName: 'webgpu (wip) webgpu_shadowmap_progressive',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuShadowmapVsm: Story = {
  args: {
    exampleName: 'webgpu_shadowmap_vsm',
  },
  storyName: 'webgpu (wip) webgpu_shadowmap_vsm',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuSkinning: Story = {
  args: {
    exampleName: 'webgpu_skinning',
  },
  storyName: 'webgpu (wip) webgpu_skinning',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuSkinningInstancing: Story = {
  args: {
    exampleName: 'webgpu_skinning_instancing',
  },
  storyName: 'webgpu (wip) webgpu_skinning_instancing',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuSkinningPoints: Story = {
  args: {
    exampleName: 'webgpu_skinning_points',
  },
  storyName: 'webgpu (wip) webgpu_skinning_points',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuSky: Story = {
  args: {
    exampleName: 'webgpu_sky',
  },
  storyName: 'webgpu (wip) webgpu_sky',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuSprites: Story = {
  args: {
    exampleName: 'webgpu_sprites',
  },
  storyName: 'webgpu (wip) webgpu_sprites',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuStorageBuffer: Story = {
  args: {
    exampleName: 'webgpu_storage_buffer',
  },
  storyName: 'webgpu (wip) webgpu_storage_buffer',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTexturegrad: Story = {
  args: {
    exampleName: 'webgpu_texturegrad',
  },
  storyName: 'webgpu (wip) webgpu_texturegrad',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTextures2DArray: Story = {
  args: {
    exampleName: 'webgpu_textures_2d-array',
  },
  storyName: 'webgpu (wip) webgpu_textures_2d-array',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTextures2DArrayCompressed: Story = {
  args: {
    exampleName: 'webgpu_textures_2d-array_compressed',
  },
  storyName: 'webgpu (wip) webgpu_textures_2d-array_compressed',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTexturesAnisotropy: Story = {
  args: {
    exampleName: 'webgpu_textures_anisotropy',
  },
  storyName: 'webgpu (wip) webgpu_textures_anisotropy',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTexturesPartialupdate: Story = {
  args: {
    exampleName: 'webgpu_textures_partialupdate',
  },
  storyName: 'webgpu (wip) webgpu_textures_partialupdate',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTonemapping: Story = {
  args: {
    exampleName: 'webgpu_tonemapping',
  },
  storyName: 'webgpu (wip) webgpu_tonemapping',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTslAngularSlicing: Story = {
  args: {
    exampleName: 'webgpu_tsl_angular_slicing',
  },
  storyName: 'webgpu (wip) webgpu_tsl_angular_slicing',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTslCoffeeSmoke: Story = {
  args: {
    exampleName: 'webgpu_tsl_coffee_smoke',
  },
  storyName: 'webgpu (wip) webgpu_tsl_coffee_smoke',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTslComputeAttractorsParticles: Story = {
  args: {
    exampleName: 'webgpu_tsl_compute_attractors_particles',
  },
  storyName: 'webgpu (wip) webgpu_tsl_compute_attractors_particles',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTslEarth: Story = {
  args: {
    exampleName: 'webgpu_tsl_earth',
  },
  storyName: 'webgpu (wip) webgpu_tsl_earth',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTslEditor: Story = {
  args: {
    exampleName: 'webgpu_tsl_editor',
  },
  storyName: 'webgpu (wip) webgpu_tsl_editor',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTslGalaxy: Story = {
  args: {
    exampleName: 'webgpu_tsl_galaxy',
  },
  storyName: 'webgpu (wip) webgpu_tsl_galaxy',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTslHalftone: Story = {
  args: {
    exampleName: 'webgpu_tsl_halftone',
  },
  storyName: 'webgpu (wip) webgpu_tsl_halftone',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTslInteroperability: Story = {
  args: {
    exampleName: 'webgpu_tsl_interoperability',
  },
  storyName: 'webgpu (wip) webgpu_tsl_interoperability',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTslProceduralTerrain: Story = {
  args: {
    exampleName: 'webgpu_tsl_procedural_terrain',
  },
  storyName: 'webgpu (wip) webgpu_tsl_procedural_terrain',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTslRagingSea: Story = {
  args: {
    exampleName: 'webgpu_tsl_raging_sea',
  },
  storyName: 'webgpu (wip) webgpu_tsl_raging_sea',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTslTranspiler: Story = {
  args: {
    exampleName: 'webgpu_tsl_transpiler',
  },
  storyName: 'webgpu (wip) webgpu_tsl_transpiler',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTslVfxFlames: Story = {
  args: {
    exampleName: 'webgpu_tsl_vfx_flames',
  },
  storyName: 'webgpu (wip) webgpu_tsl_vfx_flames',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTslVfxLinkedparticles: Story = {
  args: {
    exampleName: 'webgpu_tsl_vfx_linkedparticles',
  },
  storyName: 'webgpu (wip) webgpu_tsl_vfx_linkedparticles',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuTslVfxTornado: Story = {
  args: {
    exampleName: 'webgpu_tsl_vfx_tornado',
  },
  storyName: 'webgpu (wip) webgpu_tsl_vfx_tornado',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuVideoPanorama: Story = {
  args: {
    exampleName: 'webgpu_video_panorama',
  },
  storyName: 'webgpu (wip) webgpu_video_panorama',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuVolumeCloud: Story = {
  args: {
    exampleName: 'webgpu_volume_cloud',
  },
  storyName: 'webgpu (wip) webgpu_volume_cloud',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuVolumePerlin: Story = {
  args: {
    exampleName: 'webgpu_volume_perlin',
  },
  storyName: 'webgpu (wip) webgpu_volume_perlin',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebgpuWater: Story = {
  args: {
    exampleName: 'webgpu_water',
  },
  storyName: 'webgpu (wip) webgpu_water',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebaudioOrientation: Story = {
  args: {
    exampleName: 'webaudio_orientation',
  },
  storyName: 'webaudio webaudio_orientation',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebaudioSandbox: Story = {
  args: {
    exampleName: 'webaudio_sandbox',
  },
  storyName: 'webaudio webaudio_sandbox',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebaudioTiming: Story = {
  args: {
    exampleName: 'webaudio_timing',
  },
  storyName: 'webaudio webaudio_timing',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebaudioVisualizer: Story = {
  args: {
    exampleName: 'webaudio_visualizer',
  },
  storyName: 'webaudio webaudio_visualizer',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrArCones: Story = {
  args: {
    exampleName: 'webxr_ar_cones',
  },
  storyName: 'webxr webxr_ar_cones',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrArHittest: Story = {
  args: {
    exampleName: 'webxr_ar_hittest',
  },
  storyName: 'webxr webxr_ar_hittest',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrArLighting: Story = {
  args: {
    exampleName: 'webxr_ar_lighting',
  },
  storyName: 'webxr webxr_ar_lighting',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrArPlaneDetection: Story = {
  args: {
    exampleName: 'webxr_ar_plane_detection',
  },
  storyName: 'webxr webxr_ar_plane_detection',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrVrHandinput: Story = {
  args: {
    exampleName: 'webxr_vr_handinput',
  },
  storyName: 'webxr webxr_vr_handinput',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrVrHandinputCubes: Story = {
  args: {
    exampleName: 'webxr_vr_handinput_cubes',
  },
  storyName: 'webxr webxr_vr_handinput_cubes',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrVrHandinputProfiles: Story = {
  args: {
    exampleName: 'webxr_vr_handinput_profiles',
  },
  storyName: 'webxr webxr_vr_handinput_profiles',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrVrHandinputPointerclick: Story = {
  args: {
    exampleName: 'webxr_vr_handinput_pointerclick',
  },
  storyName: 'webxr webxr_vr_handinput_pointerclick',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrVrHandinputPointerdrag: Story = {
  args: {
    exampleName: 'webxr_vr_handinput_pointerdrag',
  },
  storyName: 'webxr webxr_vr_handinput_pointerdrag',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrVrHandinputPressbutton: Story = {
  args: {
    exampleName: 'webxr_vr_handinput_pressbutton',
  },
  storyName: 'webxr webxr_vr_handinput_pressbutton',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrVrLayers: Story = {
  args: {
    exampleName: 'webxr_vr_layers',
  },
  storyName: 'webxr webxr_vr_layers',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrVrPanorama: Story = {
  args: {
    exampleName: 'webxr_vr_panorama',
  },
  storyName: 'webxr webxr_vr_panorama',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrVrPanoramaDepth: Story = {
  args: {
    exampleName: 'webxr_vr_panorama_depth',
  },
  storyName: 'webxr webxr_vr_panorama_depth',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrVrRollercoaster: Story = {
  args: {
    exampleName: 'webxr_vr_rollercoaster',
  },
  storyName: 'webxr webxr_vr_rollercoaster',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrVrSandbox: Story = {
  args: {
    exampleName: 'webxr_vr_sandbox',
  },
  storyName: 'webxr webxr_vr_sandbox',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrVrTeleport: Story = {
  args: {
    exampleName: 'webxr_vr_teleport',
  },
  storyName: 'webxr webxr_vr_teleport',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrVrVideo: Story = {
  args: {
    exampleName: 'webxr_vr_video',
  },
  storyName: 'webxr webxr_vr_video',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrXrBallshooter: Story = {
  args: {
    exampleName: 'webxr_xr_ballshooter',
  },
  storyName: 'webxr webxr_xr_ballshooter',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrXrControlsTransform: Story = {
  args: {
    exampleName: 'webxr_xr_controls_transform',
  },
  storyName: 'webxr webxr_xr_controls_transform',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrXrCubes: Story = {
  args: {
    exampleName: 'webxr_xr_cubes',
  },
  storyName: 'webxr webxr_xr_cubes',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrXrDragging: Story = {
  args: {
    exampleName: 'webxr_xr_dragging',
  },
  storyName: 'webxr webxr_xr_dragging',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrXrDraggingCustomDepth: Story = {
  args: {
    exampleName: 'webxr_xr_dragging_custom_depth',
  },
  storyName: 'webxr webxr_xr_dragging_custom_depth',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrXrHaptics: Story = {
  args: {
    exampleName: 'webxr_xr_haptics',
  },
  storyName: 'webxr webxr_xr_haptics',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrXrPaint: Story = {
  args: {
    exampleName: 'webxr_xr_paint',
  },
  storyName: 'webxr webxr_xr_paint',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebxrXrSculpt: Story = {
  args: {
    exampleName: 'webxr_xr_sculpt',
  },
  storyName: 'webxr webxr_xr_sculpt',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const GamesFps: Story = {
  args: {
    exampleName: 'games_fps',
  },
  storyName: 'games games_fps',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const PhysicsAmmoBreak: Story = {
  args: {
    exampleName: 'physics_ammo_break',
  },
  storyName: 'physics physics_ammo_break',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const PhysicsAmmoCloth: Story = {
  args: {
    exampleName: 'physics_ammo_cloth',
  },
  storyName: 'physics physics_ammo_cloth',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const PhysicsAmmoInstancing: Story = {
  args: {
    exampleName: 'physics_ammo_instancing',
  },
  storyName: 'physics physics_ammo_instancing',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const PhysicsAmmoRope: Story = {
  args: {
    exampleName: 'physics_ammo_rope',
  },
  storyName: 'physics physics_ammo_rope',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const PhysicsAmmoTerrain: Story = {
  args: {
    exampleName: 'physics_ammo_terrain',
  },
  storyName: 'physics physics_ammo_terrain',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const PhysicsAmmoVolume: Story = {
  args: {
    exampleName: 'physics_ammo_volume',
  },
  storyName: 'physics physics_ammo_volume',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const PhysicsJoltInstancing: Story = {
  args: {
    exampleName: 'physics_jolt_instancing',
  },
  storyName: 'physics physics_jolt_instancing',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const PhysicsRapierInstancing: Story = {
  args: {
    exampleName: 'physics_rapier_instancing',
  },
  storyName: 'physics physics_rapier_instancing',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscAnimationGroups: Story = {
  args: {
    exampleName: 'misc_animation_groups',
  },
  storyName: 'misc misc_animation_groups',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscAnimationKeys: Story = {
  args: {
    exampleName: 'misc_animation_keys',
  },
  storyName: 'misc misc_animation_keys',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscBoxselection: Story = {
  args: {
    exampleName: 'misc_boxselection',
  },
  storyName: 'misc misc_boxselection',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscControlsArcball: Story = {
  args: {
    exampleName: 'misc_controls_arcball',
  },
  storyName: 'misc misc_controls_arcball',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscControlsDrag: Story = {
  args: {
    exampleName: 'misc_controls_drag',
  },
  storyName: 'misc misc_controls_drag',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscControlsFly: Story = {
  args: {
    exampleName: 'misc_controls_fly',
  },
  storyName: 'misc misc_controls_fly',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscControlsMap: Story = {
  args: {
    exampleName: 'misc_controls_map',
  },
  storyName: 'misc misc_controls_map',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscControlsOrbit: Story = {
  args: {
    exampleName: 'misc_controls_orbit',
  },
  storyName: 'misc misc_controls_orbit',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscControlsPointerlock: Story = {
  args: {
    exampleName: 'misc_controls_pointerlock',
  },
  storyName: 'misc misc_controls_pointerlock',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscControlsTrackball: Story = {
  args: {
    exampleName: 'misc_controls_trackball',
  },
  storyName: 'misc misc_controls_trackball',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscControlsTransform: Story = {
  args: {
    exampleName: 'misc_controls_transform',
  },
  storyName: 'misc misc_controls_transform',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscExporterDraco: Story = {
  args: {
    exampleName: 'misc_exporter_draco',
  },
  storyName: 'misc misc_exporter_draco',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscExporterGltf: Story = {
  args: {
    exampleName: 'misc_exporter_gltf',
  },
  storyName: 'misc misc_exporter_gltf',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscExporterObj: Story = {
  args: {
    exampleName: 'misc_exporter_obj',
  },
  storyName: 'misc misc_exporter_obj',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscExporterPly: Story = {
  args: {
    exampleName: 'misc_exporter_ply',
  },
  storyName: 'misc misc_exporter_ply',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscExporterStl: Story = {
  args: {
    exampleName: 'misc_exporter_stl',
  },
  storyName: 'misc misc_exporter_stl',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscExporterUsdz: Story = {
  args: {
    exampleName: 'misc_exporter_usdz',
  },
  storyName: 'misc misc_exporter_usdz',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscExporterExr: Story = {
  args: {
    exampleName: 'misc_exporter_exr',
  },
  storyName: 'misc misc_exporter_exr',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscExporterKtx2: Story = {
  args: {
    exampleName: 'misc_exporter_ktx2',
  },
  storyName: 'misc misc_exporter_ktx2',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscLookat: Story = {
  args: {
    exampleName: 'misc_lookat',
  },
  storyName: 'misc misc_lookat',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const Css2DLabel: Story = {
  args: {
    exampleName: 'css2d_label',
  },
  storyName: 'css2d css2d_label',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const Css3DMolecules: Story = {
  args: {
    exampleName: 'css3d_molecules',
  },
  storyName: 'css3d css3d_molecules',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const Css3DOrthographic: Story = {
  args: {
    exampleName: 'css3d_orthographic',
  },
  storyName: 'css3d css3d_orthographic',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const Css3DPeriodictable: Story = {
  args: {
    exampleName: 'css3d_periodictable',
  },
  storyName: 'css3d css3d_periodictable',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const Css3DSandbox: Story = {
  args: {
    exampleName: 'css3d_sandbox',
  },
  storyName: 'css3d css3d_sandbox',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const Css3DSprites: Story = {
  args: {
    exampleName: 'css3d_sprites',
  },
  storyName: 'css3d css3d_sprites',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const Css3DYoutube: Story = {
  args: {
    exampleName: 'css3d_youtube',
  },
  storyName: 'css3d css3d_youtube',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const SvgLines: Story = {
  args: {
    exampleName: 'svg_lines',
  },
  storyName: 'svg svg_lines',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const SvgSandbox: Story = {
  args: {
    exampleName: 'svg_sandbox',
  },
  storyName: 'svg svg_sandbox',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglFurnaceTest: Story = {
  args: {
    exampleName: 'webgl_furnace_test',
  },
  storyName: 'tests webgl_furnace_test',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const WebglPmremTest: Story = {
  args: {
    exampleName: 'webgl_pmrem_test',
  },
  storyName: 'tests webgl_pmrem_test',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const MiscUvTests: Story = {
  args: {
    exampleName: 'misc_uv_tests',
  },
  storyName: 'tests misc_uv_tests',
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};
