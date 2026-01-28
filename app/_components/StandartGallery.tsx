import { getImageUrl } from '@/utils/api-helpers';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from "next/image";

export type ImageItemProps = {
  id: string;
  url: string;
  formats?: { large: { url: string } };
  alternativeText?: string;
};

export default function StandartGallery({ images }: { images: ImageItemProps[] }) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // < 600px
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px - 900px
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg')); // 900px - 1200px
  const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl')); // 1200px - 1536px
  const isXl = useMediaQuery(theme.breakpoints.up('xl')); // > 1536px

  // Determine cols and rowHeight based on screen size
  const getCols = () => {
    if (isXs || isSm) return 2; // Mobile: 2 cols
    if (isMd) return 3; // Tablet: 3 cols  
    return 4; // Desktop and above: 4 cols
  };

  const getRowHeight = () => {
    if (isXs || isSm) return Math.min(window.innerHeight * 0.6, 300); // 60% of screen height, max 300px
    if (isMd) return 350; // Tablet: 350px
    if (isLg) return 400; // Desktop: 400px
    return 425; // Large desktop: 425px
  };

  return (
    <div
      style={{
        overflowX: 'auto',
        maxWidth: '100%',
      }}
    >
      <ImageList
        cols={getCols()}
        rowHeight={getRowHeight()}
        sx={{
          width: '100%',
        }}
      >
        {images.map((photo) => (
          <ImageListItem
            key={photo.id}
            sx={{ 
              position: 'relative', 
              height: '100%',
              // Fixed width for 1920px+ screens, auto for others
              width: isXl ? '470px' : 'auto'
            }}
          >
            <Image
              src={getImageUrl(photo.url)||''}
              alt={photo.alternativeText || "Image"}
              fill={true}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
