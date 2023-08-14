/* eslint-disable react/no-unescaped-entities */
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/user';
import { NewPosts } from "../components/NewPosts";
import { ListPosts } from '../components/ListPosts';

export const Home = () => {
  const user = useAtom(userAtom)

  return (
    <>
      {!user[0].id ?
      <p>
        Welcome on My Social Network. This website is a training to React, global state handling and tokens. Here, authentification and routing will be used to create a small social media website.
      </p>:""}
      { user[0].id && <NewPosts />}
      { user[0].id && <ListPosts />}
    </>
  )
}
