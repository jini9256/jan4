import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styled from "@emotion/native";
import { SCREEN_HEIGHT } from "../util";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import RatedCard from "../components/RatedCard";
import UpComingCard from "../components/UpComingCard";

export default function Movies({ navigation: { navigate } }) {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [isLoadong, setIsLoading] = useState(true);
  const [ratedMovie, setRatedMovie] = useState([]);
  const [upComings, setUpComings] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const BASE_URL = "https://api.themoviedb.org/3/movie";
  const API_KEY = "5a7d52d33d0aa2e8956a73c736af7304";

  const getNowPlaying = async () => {
    const { results } = await fetch(
      `${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json());
    setNowPlaying(results);
  };
  const getTopRated = async () => {
    const { results } = await fetch(
      `${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json());

    setRatedMovie(results);
  };
  const getUpcoming = async () => {
    const { results } = await fetch(
      `${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json());
    setUpComings(results);
  };

  const getData = async () => {
    await Promise.all([getNowPlaying(), getTopRated(), getUpcoming()]);
    setIsLoading(false);
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoadong) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    );
  }

  return (
    <FlatList
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <Swiper height="100%" showsPagination={false} autoplay loop>
            {nowPlaying.map((movie) => (
              <Slide key={movie.id} movie={movie} />
            ))}
          </Swiper>
          <ListTitle>Top Rated Movies</ListTitle>
          <FlatList
            horizontal
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsHorizontalScrollIndicator={false}
            data={ratedMovie}
            renderItem={({ item }) => <RatedCard movie={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={<View style={{ width: 10 }} />}
          />

          <ListTitle>Upcoming Movies</ListTitle>
        </>
      }
      data={upComings}
      renderItem={({ item }) => <UpComingCard movie={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={<View style={{ height: 15 }} />}
    />

    // <View>
    //   {/* navigate이름은 옮겨가려하는 네비게이터가 다르므로 파일 이름(Stacks)을 써줘야한다 */}
    //   <TouchableOpacity
    //     onPress={() =>
    //       navigate("Stacks", { screen: "one", params: { id: 123 } })
    //     }
    //   >
    //     <Text>Detail</Text>
    //   </TouchableOpacity>
    // </View>
  );
}

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.title};
`;
