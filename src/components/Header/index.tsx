import * as Dialog from '@radix-ui/react-dialog';
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

import logoImg from '../../assets/logo.svg';
import { NewTransactionModal } from '../NewTransactionModal';

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild> 
            {/* asChild ele nao cria um novo botão mas sim utiliza o NewTransactionButton como o botão */}
            <NewTransactionButton>Nova Transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}