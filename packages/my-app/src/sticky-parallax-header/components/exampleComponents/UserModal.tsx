import { useNavigation } from '@react-navigation/native';
import { StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AvatarHeaderScrollView } from 'react-native-sticky-parallax-header';

import type { User } from '../../assets/data/cards';
import { iconCloseWhite, IconMenu } from '../../assets/icons';
import { screenStyles } from '../../constants';
import type { RootStackNavigationProp } from '../../navigation/types';

import QuizListElement from './QuizListElement';
import { FC, useCallback, useEffect, useMemo, useRef } from 'react';

interface Props {
  user?: User;
  setModalVisible(v: boolean): void;
  onPressCloseModal(): void;
}

const UserModal: FC<Props> = ({ setModalVisible, user, onPressCloseModal }) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const insets = useSafeAreaInsets();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const title = "Author's Quizes";
  const cards = useMemo(
    () => [
      {
        id: '4850294857',
        elements: user?.cardsAmount ?? 0,
        authorName: user?.author ?? '',
        mainText: user?.label ?? '',
        labelText: user?.type ?? '',
        imageSource: user?.image ?? null,
      },
    ],
    [user],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const onQuizListElementPress = useCallback(() => {
    setModalVisible(false);
    timeoutRef.current = setTimeout(() => {
      navigation.navigate('Card', { user });
    }, 300);
  }, [navigation, setModalVisible, user]);

  return (
    <>
      <StatusBar backgroundColor={user?.color} barStyle="light-content" />
      <View style={{ backgroundColor: user?.color, paddingTop: insets.top }} />
      <AvatarHeaderScrollView
        image={user?.image ?? { uri: '' }}
        title={user?.author}
        subtitle={user?.about}
        hasBorderRadius
        backgroundColor={user?.color}
        leftTopIconOnPress={onPressCloseModal}
        leftTopIcon={iconCloseWhite}
        rightTopIcon={IconMenu}
      >
        <View style={[screenStyles.content]}>
          <Text style={screenStyles.contentText}>{title}</Text>
          {cards.map((card) => (
            <QuizListElement
              key={card.id}
              elements={card.elements}
              authorName={card.authorName}
              mainText={card.mainText}
              labelText={card.labelText}
              imageSource={card.imageSource}
              onPress={onQuizListElementPress}
            />
          ))}
        </View>
      </AvatarHeaderScrollView>
    </>
  );
};

export default UserModal;
